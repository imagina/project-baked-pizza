import mapAreaService from 'src/services/maparea'
import {helper} from '@imagina/qhelper/_plugins/helper'

export async function getShops (context, payload) {

    const shops = await mapAreaService.stores()
    if (Object.keys(shops.data).length > 0) {
        context.commit('Shops', shops)
    }

}

export async function getTypeOrder (context, payload){
    const type = await helper.storage.set('typeOrder')
    console.log(type)
}
