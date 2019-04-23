import mapAreaService from 'src/services/maparea'
import {helper} from '@imagina/qhelper/_plugins/helper'

export async function getShops (context, payload) {

    const shops = await mapAreaService.stores()
    if (Object.keys(shops.data).length > 0) {
        context.commit('Shops', shops)
    }

}

export async function getTypeOrder (context, payload){
    const type = await helper.storage.get.item('typeOrder')
    context.commit('Domicile',type)
}

export async function setTypeOrder (context, payload){
    const type = await helper.storage.set('typeOrder',payload)
    context.commit('Domicile',payload)
}

export async function getStoreSelected (context, payload){
    const type = await helper.storage.get.item('storeSelected')
    context.commit('storeSelected',type)
}

export async function setStoreSelected (context, payload){
    const type = await helper.storage.set('storeSelected',payload)
    context.commit('storeSelected',payload)
}
