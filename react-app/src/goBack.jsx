import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <ul class="flex my-4 items-center flex-row justify-center gap-6 md:text-lg uppercase font-semibold">
    <li>
      <Link class="border bg-slate-200/80  md:text-lg lead font-bold px-4 py-2 rounded-lg" to="/">/</Link>
      </li>
    </ul>
  )
}

export default Home