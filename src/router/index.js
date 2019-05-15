import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import ImageRecognition from '@/pages/ImageRecognition'
import SoundDetection from '@/pages/SoundDetection'
import NaturalLanguageProcessing from '@/pages/NaturalLanguageProcessing'
import ImageReconstruction from '@/pages/ImageReconstruction'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/image-recognition',
      name: 'ImageRecognition',
      component: ImageRecognition
    },
    {
      path: '/sound-detection',
      name: 'SoundDetection',
      component: SoundDetection
    },
    {
      path: '/nlp',
      name: 'NaturalLanguageProcessing',
      component: NaturalLanguageProcessing
    },
    {
      path: '/image-reconstruction',
      name: 'ImageReconstruction',
      component: ImageReconstruction
    }
  ]
})
