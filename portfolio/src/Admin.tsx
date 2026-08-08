import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { supabase, supabaseConfigured, storageCategories, WORKS_BUCKET, type StorageCategory } from "@/lib/supabase"

type StoredFile = {
  category: StorageCategory
  path: string
  name: string
  url: string
  isVideo: boolean
}

const categoryLabels: Record<StorageCategory, string> = {
  portrait: "Portrait",
  live: "Live",
  video: "Video",
}

function Admin() {
  const [category, setCategory] = useState<StorageCategory>("portrait")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<StoredFile[]>([])
  const [loading, setLoading] = useState(true)

  async function refresh() {
    if (!supabase) return
    setLoading(true)
    const all: StoredFile[] = []
    for (const cat of storageCategories) {
      const { data, error: listError } = await supabase.storage
        .from(WORKS_BUCKET)
        .list(cat, { sortBy: { column: "created_at", order: "desc" } })
      if (listError || !data) continue
      for (const item of data) {
        if (item.name === ".emptyFolderPlaceholder") continue
        const path = `${cat}/${item.name}`
        const { data: pub } = supabase.storage.from(WORKS_BUCKET).getPublicUrl(path)
        all.push({
          category: cat,
          path,
          name: item.name,
          url: pub.publicUrl,
          isVideo: cat === "video",
        })
      }
    }
    setFiles(all)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase || !file) return
    setUploading(true)
    setError(null)
    const path = `${category}/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
      .from(WORKS_BUCKET)
      .upload(path, file)
    setUploading(false)
    if (uploadError) {
      setError(uploadError.message)
      return
    }
    setFile(null)
    const input = document.getElementById("file-input") as HTMLInputElement | null
    if (input) input.value = ""
    refresh()
  }

  async function handleDelete(path: string) {
    if (!supabase) return
    if (!confirm("確定要刪除這個檔案嗎？")) return
    await supabase.storage.from(WORKS_BUCKET).remove([path])
    refresh()
  }

  if (!supabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-5 text-center text-[var(--fg)]">
        <p className="text-sm text-[var(--muted)]">
          Supabase 尚未設定，請先提供 VITE_SUPABASE_URL 與 VITE_SUPABASE_ANON_KEY。
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-5 py-16 text-[var(--fg)] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight">作品後台</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          上傳新照片或影片會直接出現在作品集網站上。
        </p>

        <form
          onSubmit={handleUpload}
          className="card mt-8 flex flex-col gap-4 p-6"
        >
          <div className="flex flex-wrap gap-2">
            {storageCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  category === cat
                    ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--fg)]"
                    : "border-[var(--line-strong)] text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <input
            id="file-input"
            type="file"
            accept={category === "video" ? "video/*" : "image/*"}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm text-[var(--muted)]"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={!file || uploading} className="w-fit">
            {uploading ? "上傳中…" : "上傳"}
          </Button>
        </form>

        <h2 className="mt-12 text-lg font-semibold">
          目前檔案（{loading ? "讀取中…" : files.length}）
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {files.map((f) => (
            <div key={f.path} className="card relative overflow-hidden">
              {f.isVideo ? (
                <video src={f.url} muted className="h-32 w-full object-cover" />
              ) : (
                <img src={f.url} alt={f.name} className="h-32 w-full object-cover" />
              )}
              <div className="flex items-center justify-between gap-2 p-2 text-xs text-[var(--muted)]">
                <span>{categoryLabels[f.category]}</span>
                <button
                  onClick={() => handleDelete(f.path)}
                  className="text-red-400 hover:text-red-300"
                >
                  刪除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
