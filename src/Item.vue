<template>
  <a @click="addToCart(invId, inventory)" v-show="inventory > 0" class="list-group-item list-group-item-action" style="cursor: pointer;">
    {{ name }} <span class="badge badge-info">{{ inventory }}</span> <br>
    <strong>Цена: {{ price | rubles }}</strong>
  </a>
</template>

<script>
  import {rubles} from './filters';

  export default {
    name: 'item',
    props: ['invId', 'name', 'price', 'inventory'],
    filters: {
      rubles,
    },
    methods: {
      addToCart(invId) {
        this.$store.dispatch('addToCart', invId);
      },
    },
  };
</script>

<style>

</style>
