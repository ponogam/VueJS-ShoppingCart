<template>
  <div>
    <button class="btn btn-warning" data-toggle="modal" data-target="#shoppingCart" style="cursor: pointer; color: white">
      Корзина: ({{ numInCart }})
    </button>
    <div id="shoppingCart" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Корзина <span v-show="!inCart.length">пуста как жизнь</span></h5>
            <button class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <table class="table" v-show="!!inCart.length">
              <tbody>
              <tr v-for="(item, index) in cart" :key="item.invId">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td style="white-space: nowrap;">{{ item.price | rubles }}</td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="removeFromCart(index, item.quantity)">&times;</button>
                </td>
              </tr>
              <tr>
                <th style="white-space: nowrap; text-align: right;">Всего: {{ total | rubles }}</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {rubles} from './filters';

  export default {
    name: 'shoppingCart',
    computed: {
      inCart() { return this.$store.getters.inCart; },
      numInCart() { return this.inCart.length; },
      cart() {
        return this.$store.getters.inCart.map(({invId, quantity}) => {
          const product = this.$store.getters.goods.find(product => product.invId === invId)
          return {
            name: product.name,
            price: product.price,
            invId: product.invId,
            quantity: quantity
          }
        });
      },
      total() {
        return this.cart.reduce((acc, cur) => acc + cur.price*cur.quantity, 0);
      },
    },
    filters: {
      rubles,
    },
    methods: {
      removeFromCart(index) {this.$store.dispatch('removeFromCart', index)},
    },
  };
</script>
