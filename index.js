import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// אין מסד נתונים: המשימות נשמרות במערך בזיכרון.
// בכל Deploy חדש המערך מתאפס.
let tasks = [
  { id: 1, title: 'ללמוד Railway', done: false },
  { id: 2, title: 'להעלות שרת ראשון', done: false }
]
let nextId = 3

app.get('/', (req, res) => {
  res.json({ message: 'Array API is running on Railway' })
})

app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/api/tasks', (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ error: 'title is required' })

  const task = { id: nextId++, title, done: false }
  tasks.push(task)
  res.status(201).json(task)
})

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id))
  res.json({ message: 'Task deleted' })
})

// Railway נותן את הפורט במשתנה PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
