"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff } from "lucide-react"

// Dynamically import ReactQuill with enhanced modules
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")

    // Register table module
    const Quill = (await import("quill")).default
    const TableModule = (await import("quill-better-table")).default

    Quill.register(
      {
        "modules/better-table": TableModule,
      },
      true,
    )

    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />
  },
  {
    ssr: false,
    loading: () => (
      <div className="border border-border rounded-md p-4 min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    ),
  },
)

interface EnhancedEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  readOnly?: boolean
}

export function EnhancedEditor({ value, onChange, placeholder, readOnly = false }: EnhancedEditorProps) {
  const quillRef = useRef<any>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],
        ["better-table"],
        ["clean"],
      ],
      handlers: {
        "better-table": function () {
          const tableModule = this.quill.getModule("better-table")
          tableModule.insertTable(3, 3)
        },
        image: function () {
          const input = document.createElement("input")
          input.setAttribute("type", "file")
          input.setAttribute("accept", "image/*")
          input.click()

          input.onchange = () => {
            const file = input.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = (e) => {
                const range = this.quill.getSelection()
                this.quill.insertEmbed(range.index, "image", e.target?.result)
              }
              reader.readAsDataURL(file)
            }
          }
        },
      },
    },
    "better-table": {
      operationMenu: {
        items: {
          unmergeCells: {
            text: "Unmerge cells",
          },
        },
        color: {
          colors: [
            "#ffffff",
            "#f8f9fa",
            "#e9ecef",
            "#dee2e6",
            "#ced4da",
            "#adb5bd",
            "#6c757d",
            "#495057",
            "#343a40",
            "#212529",
            "#007bff",
            "#6610f2",
            "#6f42c1",
            "#e83e8c",
            "#dc3545",
            "#fd7e14",
            "#ffc107",
            "#28a745",
            "#20c997",
            "#17a2b8",
            "#6c757d",
            "#343a40",
            "#007bff",
            "#28a745",
          ],
          text: "Background Colors:",
        },
      },
    },
    keyboard: {
      bindings: {
        tab: {
          key: 9,
          handler: () => true,
        },
      },
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "check",
    "indent",
    "direction",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
    "formula",
    "better-table",
    "clean",
  ]

  useEffect(() => {
    if (value) {
      const text = value.replace(/<[^>]*>/g, "")
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0)
      setWordCount(words.length)
      setCharCount(text.length)
    } else {
      setWordCount(0)
      setCharCount(0)
    }
  }, [value])

  const insertTemplate = (template: string) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor()
      const range = quill.getSelection()
      quill.insertText(range.index, template)
    }
  }

  const templates = [
    {
      name: "Strategy Framework",
      content: `
<h2>Strategic Framework Overview</h2>
<p>Brief introduction to the framework...</p>

<h3>Key Components</h3>
<ol>
  <li><strong>Analysis Phase:</strong> Description</li>
  <li><strong>Planning Phase:</strong> Description</li>
  <li><strong>Execution Phase:</strong> Description</li>
</ol>

<h3>Implementation Steps</h3>
<table>
  <tr>
    <th>Step</th>
    <th>Action</th>
    <th>Timeline</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Initial Assessment</td>
    <td>Week 1</td>
  </tr>
</table>

<blockquote>
💡 <strong>Pro Tip:</strong> Key insight or recommendation
</blockquote>
      `,
    },
    {
      name: "Case Study",
      content: `
<h2>Case Study: [Company Name]</h2>

<h3>The Challenge</h3>
<p>Describe the problem or opportunity...</p>

<h3>The Solution</h3>
<p>Explain the approach taken...</p>

<h3>Results</h3>
<ul>
  <li>📈 Metric 1: X% improvement</li>
  <li>💰 Metric 2: $X increase</li>
  <li>⏱️ Metric 3: X% faster</li>
</ul>

<h3>Key Takeaways</h3>
<ol>
  <li>Lesson learned 1</li>
  <li>Lesson learned 2</li>
  <li>Lesson learned 3</li>
</ol>
      `,
    },
    {
      name: "How-To Guide",
      content: `
<h2>How to [Achieve Goal]</h2>
<p>Introduction explaining what readers will learn...</p>

<h3>Prerequisites</h3>
<ul>
  <li>Requirement 1</li>
  <li>Requirement 2</li>
</ul>

<h3>Step-by-Step Process</h3>

<h4>Step 1: [Action]</h4>
<p>Detailed explanation...</p>
<blockquote>⚠️ <strong>Important:</strong> Key warning or note</blockquote>

<h4>Step 2: [Action]</h4>
<p>Detailed explanation...</p>

<h3>Common Pitfalls</h3>
<ul>
  <li>❌ Mistake 1 and how to avoid it</li>
  <li>❌ Mistake 2 and how to avoid it</li>
</ul>

<h3>Next Steps</h3>
<p>What to do after completing this guide...</p>
      `,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Enhanced Content Editor</CardTitle>
            <CardDescription>Advanced rich text editor with tables, formatting, and templates</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Templates */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Quick Templates:</span>
          {templates.map((template) => (
            <Button key={template.name} variant="outline" size="sm" onClick={() => onChange(value + template.content)}>
              {template.name}
            </Button>
          ))}
        </div>

        {/* Editor */}
        {showPreview ? (
          <div className="border border-border rounded-md p-4 min-h-[300px] bg-card">
            <div
              className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-a:text-accent hover:prose-a:text-accent/80"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        ) : (
          <div className="relative">
            <ReactQuill
              forwardedRef={quillRef}
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder || "Start writing your strategic insights..."}
              readOnly={readOnly}
              style={{ minHeight: "300px" }}
            />
          </div>
        )}

        {/* Editor Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
          <div className="flex items-center space-x-4">
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
            <span>Read time: {Math.ceil(wordCount / 200)} min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Enhanced Editor</Badge>
          </div>
        </div>

        {/* Editor Tips */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
          <p>
            <strong>💡 Pro Tips:</strong>
          </p>
          <ul className="mt-1 space-y-1">
            <li>
              • Use <kbd>Ctrl+B</kbd> for bold, <kbd>Ctrl+I</kbd> for italic, <kbd>Ctrl+K</kbd> for links
            </li>
            <li>• Click the table icon to insert tables with advanced formatting</li>
            <li>• Use templates above for consistent content structure</li>
            <li>• Drag and drop images directly into the editor</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
