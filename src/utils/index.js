import Vue from 'vue'
import { findValue } from './findValue'
import breadcrumb from 'src/components/pages/sections/breadcrumb'
import sectionCartingApp from 'src/components/pages/sections/section-carting-app'

export {
  findValue
}

[
  breadcrumb,
  sectionCartingApp
].forEach(Component => {
	Vue.component(Component.name, Component)
})
