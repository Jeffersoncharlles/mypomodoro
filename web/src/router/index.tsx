import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { History } from '../pages/History'
import { Home } from '../pages/Home'

/**
 * DefaultLayout
 * e o que sempre vai ter e nao vai mudar no app
 * ex: header ou footer que sempre tiver independe da rota
 */

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
