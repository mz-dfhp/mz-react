import { lazy } from 'react'
import { IRoute } from './index'

const Layout = lazy(() => import('@/layout/index'))
const Error404 = lazy(() => import('@/views/error/404'))
const Error403 = lazy(() => import('@/views/error/403'))

const modules = import.meta.glob('./modules/*.router.tsx', {
  import: 'default',
  eager: true
})
const modulesRoutes: IRoute[] = []
Object.keys(modules).forEach((item) => {
  modulesRoutes.push(modules[item] as IRoute)
})

export const asyncRoutes: IRoute[] = [
  {
    path: '/',
    element: <Layout />,
    children: modulesRoutes.sort(
      (a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0)
    )
  }
]

export const errorRoutes: IRoute[] = [
  {
    path: '*',
    element: <Error404 />,
    meta: {
      title: '404'
    }
  },
  {
    path: '/403',
    element: <Error403 />,
    meta: {
      title: '403'
    }
  }
]
