import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'
import crud from '@imagina/qhelper/_services/baseService'

export default {
  crud,
}