import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import About from './views/About.vue'
import Dashboad from './views/Dashboard.vue'
import Student from './views/Student.vue'
import Skill from './views/Skill.vue'
import Character from './views/Character.vue'
import EditStudent from './views/EditStudent.vue'
import Ourworks from './views/ourwork2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboad
    },
    {
      path: '/edit',
      name: 'EditStudent',
      component: EditStudent
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/skill',
      name: 'Skill',
      component: Skill
    },
    {
      path: '/character',
      name: 'Character',
      component: Character
    },
    {
      path: '/ourworks',
      name: 'Ourworks',
      component: Ourworks
    },
  ]
})
