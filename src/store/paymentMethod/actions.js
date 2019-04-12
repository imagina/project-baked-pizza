export async function setPaymentMethodSelected(context, payload){
    context.commit('paymentMethodSelected',payload)
}