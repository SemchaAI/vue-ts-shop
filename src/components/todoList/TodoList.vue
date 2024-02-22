<script setup lang="ts">
import type { IPost } from '@/components/todoList/todolist.interface'
import { PostService, type TPostDTO } from '@/services/post.service'
import { reactive } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const { data: posts, isSuccess } = useQuery({
  queryKey: ['getPosts'],
  queryFn: () => PostService.getAll()
})
const { mutate, isLoading: isLoadingDelete } = useMutation({
  mutationKey: ['deletePost'],
  mutationFn: (id: number) => PostService.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries(['getPosts'])
  }
})

const { mutate: createPost, isLoading: isLoadingPost } = useMutation({
  mutationKey: ['createPost'],
  mutationFn: (body: TPostDTO) => PostService.create(body),
  onSuccess: () => {
    queryClient.invalidateQueries(['getPosts'])
  }
})

const postData = {
  title: '',
  body: ''
}
// const allData: { posts: IPost[] } = reactive({
//   posts: posts
// })

// const removePost = (id: number) => {
//   // allData.posts = allData.posts.filter((data) => data.id !== id)
// }
// const addPost = (title: string, body: string) => {
//   if (title && body) {
//     const newPost = {
//       // userId: 1,
//       // id: allData.posts[length].id + 1,
//       title,
//       body
//     }
//     // allData.posts.push(newPost)
//     fetch(LINK, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newPost)
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res))
//   } else {
//     alert('Please enter title and body')
//   }
// }
</script>

<template>
  <section class="todo">
    <div class="wrapper">
      <div class="todoListContainer">
        <h1 class="todoTitle">Todo List</h1>
        <div class="addTodo">
          <form class="addTodoForm">
            <input v-model="postData.title" type="text" />
            <input v-model="postData.body" type="text" />
            <button class="addTodoBtn" @click.prevent="createPost(postData)">Add</button>
          </form>
        </div>
        <ul v-if="isSuccess" class="todoList">
          <li class="todoItem" :key="post.id" v-for="post in posts.data">
            <h3 class="itemTitle">{{ post.title }}</h3>
            <p class="itemBody">{{ post.body }}</p>
            <button @click="mutate(post.id)" class="itemBtn">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.todo {
}
.todoTitle {
  color: var(--white);
}
.todoListContainer {
  display: flex;
  flex-direction: column;

  align-items: center;
}
.todoList {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
  color: white;
}
.todoItem {
}
.itemTitle {
  text-align: center;
  font-weight: bold;
}
.itemBody {
}
.itemBtn {
}
.addTodo {
}
</style>
