<template>
  <div id="app" class="container my-5">
    <div class="row mb-3">
      <div class="col-md-9">
        <h2>Тестовое задание</h2>
      </div>
      <div class="col-md-3" style="text-align: right">
        <ShoppingCart />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6"  v-for="(group, catalog) in groups" :key="group.id">
        <div class="list-group mb-4">
          <div class="list-group-item" style="color: #0c5460; background-color: #d1ecf1;">
            <h4>{{ catalog }}</h4>
          </div>
          <Item
                  v-for="item in group"
                  :key="item.invId"
                  :invId="item.invId"
                  :name="item.name"
                  :price="item.price"
                  :inventory="item.P"
                  :item="item"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Item from './Item.vue';
  import ShoppingCart from './ShoppingCart.vue';

  function groupBy(array, key){
    const result = {}
    array.forEach(item => {
      if (!result[item[key]]){
        result[item[key]] = []
      }
      result[item[key]].push(item)
    })
    return result
  }

  export default {
    name: 'app',
    computed: {
      groups() { return groupBy(this.$store.getters.goods, 'catalog') },
    },
    components: {
      Item,
      ShoppingCart,
    },
    mounted() {
      this.$store.dispatch('GET_NAMES');
      this.$store.dispatch('GET_DATA');
    }
  };
</script>
