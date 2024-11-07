export type Todo = {
    id: number
    title: string
    description: string
    status: 'pending' | 'completed'
    created_at: string
  }