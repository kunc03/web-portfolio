'use client';

import type { SkillItem } from '@/lib/skills';
import React, { useEffect, useMemo, useRef, useState } from 'react';

function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number) {
  const next = arr.slice();
  const [item] = next.splice(fromIndex, 1);
  if (item === undefined) return arr;
  next.splice(toIndex, 0, item);
  return next;
}

export default function AdminSkillsEditor({ initialItems, dbReady }: { initialItems: SkillItem[]; dbReady: boolean }) {
  const sortedInitial = useMemo(() => [...initialItems].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id), [initialItems]);
  const [items, setItems] = useState<SkillItem[]>(sortedInitial);
  const [baselineItems, setBaselineItems] = useState<SkillItem[]>(sortedInitial);
  const itemsRef = useRef<SkillItem[]>(sortedInitial);
  const didDropRef = useRef(false);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  async function persistOrder(nextItems: SkillItem[]) {
    setOrderError(null);
    setIsSavingOrder(true);
    try {
      const res = await fetch('/api/admin/skills/reorder', {
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
            data-skill-row="1"
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
              'rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10 bg-gray-50/70 dark:bg-white/5 p-4 flex flex-wrap items-center gap-3',
              'transition-transform transition-colors duration-150',
              isDragging ? 'opacity-80 scale-[1.01] ring-2 ring-gray-900/15 dark:ring-white/15 shadow-lg shadow-black/5' : '',
              isOver ? 'ring-2 ring-blue-500/25 bg-blue-50/40 dark:bg-white/10' : '',
            ].join(' ')}
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 text-sm font-semibold text-gray-800 dark:text-white/80">
                {orderNumber}
              </span>
              <button
                type="button"
                draggable={!disabled}
                onDragStart={(e) => {
                  if (disabled) return;
                  didDropRef.current = false;
                  const row = (e.currentTarget as HTMLElement).closest('[data-skill-row="1"]') as HTMLElement | null;
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

            <form action="/api/admin/skills/update" method="post" className="flex flex-wrap items-center gap-3 flex-1 min-w-[18rem]">
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="sortOrder" value={orderNumber} />
              <input
                name="name"
                defaultValue={item.name}
                className="h-10 w-56 px-3 rounded-lg text-sm bg-white dark:bg-black/20 ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-black/15 dark:focus:ring-white/20 disabled:opacity-60"
                required
                disabled={disabled}
              />
              <label className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-white/80">
                <input name="isVisible" type="checkbox" defaultChecked={item.isVisible} className="h-4 w-4 accent-gray-900 dark:accent-white" disabled={disabled} />
                Tampil
              </label>
              <button
                type="submit"
                disabled={disabled}
                className="h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-950 disabled:opacity-50 disabled:hover:bg-gray-900"
              >
                Simpan
              </button>
            </form>

            <form action="/api/admin/skills/delete" method="post">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" disabled={disabled} className="h-10 px-4 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                Hapus
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
