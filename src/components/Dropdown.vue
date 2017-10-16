<template>
  <div class="dropdown">
    <div :class="'selected-option'+(showList ? ' active' :'')" @click="showList = !showList">
      <p class="selected-value">{{value || placeholder}} </p><span class="fa fa-caret-down"></span>
    </div>
    <div :class="'selection-list '+(showList ? 'visible' : 'hidden')">
      <ul class="selections" @mouseleave="this.showList = false">
        <li :class="'selection item '+(value === option ? 'selected' : 'selectable')" v-for="option in options" @click="select(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Dropdown',
    props: {
      options: {
        type: Array
      },
      placeholder: {
        type: String,
        default: "Wähle aus"
      },
      value:{
        type: String,
        default: ""
      }
    },
    data(){
      return {
        showList: false
      }
    },
    methods: {
      select(option){
        this.showList = false;
        this.$emit('input', option);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .selected-option, .selection-list{
    user-select: none;
  }

  .selected-option{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 0.2em;
    border: solid black thin;
    cursor: pointer;
  }

  .selection-list{
    border: solid black thin;
    border-top: none;
    cursor: pointer;
    list-style: none;
    transition: height 1s ease;

    ul{
      list-style: none;

      li{
        padding: 0.2em;
      }

      li:nth-child(2n-1){
        background-color: rgba(20,20,20,0.02)
      }
    }
  }

  .selection-list, .selection-list.hidden{
    visibility: hidden;
    height: 0;
  }

  .selection-list.visible{
    visibility: visible;
    height: auto;
  }

  .selected-option.active{
    border-bottom: none;
  }
</style>
