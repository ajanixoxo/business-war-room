"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Calendar, Clock, User, LogOut } from "lucide-react"
import { useBlogStore } from "@/store/blog-store"
import { useAuth } from "../providers/auth-providers"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const { posts, isLoading, fetchPosts, deletePost, invalidateCache } = useBlogStore()
  const { user, signOut } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // Invalidate cache and fetch fresh data
    invalidateCache()
    fetchPosts()
  }, [fetchPosts, invalidateCache])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await deletePost(id)
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete blog post";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed Out",
        description: "Successfully signed out of admin panel",
      })
    } catch (error: unknown) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">War Room Command Center</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name} • Manage your strategic intelligence reports
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {posts.filter((p) => p.status === "published").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {posts.filter((p) => p.status === "draft").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {posts.filter((p) => p.type === "featured").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="grid gap-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-4">Create your first intelligence report to get started.</p>
                <Link href="/admin/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant={post.type === "featured" ? "default" : "secondary"}>{post.type}</Badge>
                        <Badge variant={post.status === "published" ? "default" : "outline"}>{post.status}</Badge>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/edit/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.read_time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author?.name || "Unknown"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
