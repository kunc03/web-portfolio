'use client';

import type { ExperienceItem } from '@/lib/experiences';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number) {
  const next = arr.slice();
  const [item] = next.splice(fromIndex, 1);
  if (item === undefined) return arr;
  next.splice(toIndex, 0, item);
  return next;
}

export default function AdminExperiencesEditor({ initialItems, dbReady }: { initialItems: ExperienceItem[]; dbReady: boolean }) {
  const router = useRouter();
  const sortedInitial = useMemo(() => [...initialItems].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id), [initialItems]);
  const [items, setItems] = useState<ExperienceItem[]>(sortedInitial);
  const [baselineItems, setBaselineItems] = useState<ExperienceItem[]>(sortedInitial);
  const itemsRef = useRef<ExperienceItem[]>(sortedInitial);
  const didDropRef = useRef(false);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  async function persistOrder(nextItems: ExperienceItem[]) {
    setOrderError(null);
    setIsSavingOrder(true);
    try {
      const res = await fetch('/api/admin/experiences/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: nextItems.map((i) => i.id) }),
      });

      if (!res.ok) {
        setOrderError('Gagal menyimpan urutan.');
        setItems(baselineItems);
        return;
      }
      setBaselineItems(nextItems);
    } catch {
      setOrderError('Gagal menyimpan urutan.');
      setItems(baselineItems);
      return;
    } finally {
      setIsSavingOrder(false);
    }
  }

  return (
    <div className="space-y-3">
      {orderError ? <div className="text-sm text-red-600 dark:text-red-400">{orderError}</div> : null}
      <div className="text-xs text-gray-600 dark:text-white/60">{isSavingOrder ? 'Menyimpan urutan...' : 'Drag & drop untuk ubah urutan.'}</div>

      {items.map((item, index) => {
        const disabled = !dbReady || item.id <= 0;
        const orderNumber = index + 1;
        const isDragging = draggingId === item.id;
        const isOver = overId === item.id && draggingId !== null && draggingId !== item.id;

        return (
          <div
            key={item.id}
            data-experience-row="1"
            onClick={() => {
              if (disabled) return;
              if (draggingId !== null) return;
              router.push(`/admin/experiences/${item.id}`);
            }}
            onDragOver={(e) => {
              if (disabled) return;
              if (draggingId === null) return;
              e.preventDefault();
            }}
            onDragEnter={(e) => {
              if (disabled) return;
              if (draggingId === null) return;
              e.preventDefault();
              setOverId(item.id);
              setItems((prev) => {
                const fromIndex = prev.findIndex((x) => x.id === draggingId);
                const toIndex = prev.findIndex((x) => x.id === item.id);
                if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return prev;
                return arrayMove(prev, fromIndex, toIndex);
              });
            }}
            onDragLeave={() => {
              if (disabled) return;
              if (draggingId === null) return;
              setOverId((current) => (current === item.id ? null : current));
            }}
            onDrop={(e) => {
              if (disabled) return;
              if (draggingId === null) return;
              e.preventDefault();
              didDropRef.current = true;
              setDraggingId(null);
              setOverId(null);
              void persistOrder(itemsRef.current);
            }}
            className={[
              'rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10 bg-gray-50/70 dark:bg-white/5 p-4',
              'flex items-center gap-3 cursor-pointer',
              'transition-transform transition-colors duration-150',
              isDragging ? 'opacity-80 scale-[1.01] ring-2 ring-gray-900/15 dark:ring-white/15 shadow-lg shadow-black/5' : '',
              isOver ? 'ring-2 ring-blue-500/25 bg-blue-50/40 dark:bg-white/10' : '',
              disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10',
            ].join(' ')}
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 text-sm font-semibold text-gray-800 dark:text-white/80">
                {orderNumber}
              </span>
              <button
                type="button"
                draggable={!disabled}
                onClick={(e) => e.stopPropagation()}
                onDragStart={(e) => {
                  if (disabled) return;
                  didDropRef.current = false;
                  const row = (e.currentTarget as HTMLElement).closest('[data-experience-row="1"]') as HTMLElement | null;
                  if (row) {
                    const rect = row.getBoundingClientRect();
                    e.dataTransfer.setDragImage(row, rect.width / 2, rect.height / 2);
                  }
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/plain', String(item.id));
                  setDraggingId(item.id);
                }}
                onDragEnd={() => {
                  setDraggingId(null);
                  setOverId(null);
                  if (!didDropRef.current) {
                    setItems(baselineItems);
                  }
                }}
                disabled={disabled}
                aria-label="Drag untuk ubah urutan"
                className="h-10 w-10 rounded-lg bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 text-gray-600 dark:text-white/60 disabled:opacity-50 cursor-grab active:cursor-grabbing"
              >
                ≡
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 dark:text-white truncate">{item.title}</div>
              <div className="text-xs text-gray-600 dark:text-white/60 truncate">
                {item.date} · {item.company} · {item.location}
              </div>
            </div>

            <span
              className={[
                'shrink-0 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium',
                item.isVisible ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200' : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white/70',
              ].join(' ')}
            >
              {item.isVisible ? 'Tampil' : 'Hidden'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

