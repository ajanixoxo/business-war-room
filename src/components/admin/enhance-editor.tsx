"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import "react-quill-new/dist/quill.snow.css"

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="border border-border rounded-md p-4 min-h-[400px] flex items-center justify-center bg-card">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
    </div>
  ),
})

export interface EnhancedEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  readOnly?: boolean
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }],
    ["code-block"],
    ["clean"],
  ],
}

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
  "code-block",
]

export function EnhancedEditor({ value, onChange, placeholder, readOnly = false }: EnhancedEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    onChange(value + template)
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
<p>Step-by-step implementation guide...</p>

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

  if (!mounted) {
    return (
      <div className="border border-border rounded-md p-4 min-h-[400px] flex items-center justify-center bg-card">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Content Editor</CardTitle>
            <CardDescription >Write your strategic insights with rich formatting</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Templates */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Quick Templates:</span>
          {templates.map((template) => (
            <Button
              key={template.name}
              variant="outline"
              size="sm"
              onClick={() => insertTemplate(template.content)}
              type="button"
            >
              {template.name}
            </Button>
          ))}
        </div>

        {/* Editor */}
        <div className="w-full">
          <ReactQuill
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            modules={quillModules}
            formats={quillFormats}
            theme="snow"
            placeholder={placeholder || "Start writing your strategic insights..."}
            style={{
              height: "400px",
            }}
            className="placeholder-text-muted-foreground"
          />
        </div>

        {/* Editor Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4 mt-16">
          <div className="flex items-center space-x-4">
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
            <span>Read time: {Math.ceil(wordCount / 200)} min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Rich Editor</Badge>
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
            <li>• Use the toolbar to format text, add lists, quotes, and code blocks</li>
            <li>• Use templates above for consistent content structure</li>
            <li>• Paste images directly into the editor</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
