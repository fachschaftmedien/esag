<template>
  <div class="commands">
    <div class="command-search group">
      <input type="text" v-model="search" autocomplete required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Suche&nbsp;<span class="fa fa-search"></span></label>
    </div>
    <div class="command-list">
      <ul>
        <li v-for="command in commands" class="command-card result">
          <div class="command-card-header">
            {{command.command}}
          </div>
          <div class="command-card-body">
            {{command.description}}
          </div>
          <div class="command-card-footer">
            <div v-for="tag in command.tags" class="command-card-tag">
              {{tag}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import commands from '../js/commands.json';

  export default {
    name: 'CommandList',
    data(){
        return {
            search: ''
        }
    },
    computed: {
        commands: function(){
            if(this.search.length === 0) return commands;
            let search = this.search.toLowerCase().trim();
            return commands.filter((el)=> {
                if(el.command.toLowerCase().indexOf(search) >= 0){
                    // when the command contains -> add to list
                    return true;
                }else if(el.tags.filter(tag => search.indexOf(tag) >= 0 || tag.indexOf(search) >= 0).length > 0){
                    // when a tag is contained -> add to list
                    return true;
                }else{
                    // the entry doesn't have something to do with the search
                    return false;
                }
            });
        }
    }
  }
</script>

<style lang="scss">

  .commands{
    width: 100%;
    height: 90%;
    margin-top: 10%;
  }

  .command-search, .command-list{
    width: 100%;
  }

  .command-search{
    height: calc(100% - 28vw - 5%);
    margin: 4% 1%;
    padding: 1% 0;

    input{
      width: 100%;
    }

    span.fa{
      font-size: 0.9em;
    }
  }

  .command-list{
    height: 28vw;
    margin: 0 1% 1%;
    overflow-y: scroll;

    ul{
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }

    .command-card{
      width: 98%;
      margin: 0.5em 1%;
      min-height: 5em;
      outline: solid rgba(20,20,40,0.02) thin;
      box-shadow: 0 0 0.5em rgba(20,20,40,0.02);
      font-size: 0.9em;

      .command-card-header, .command-card-body, .command-card-footer{
        min-height: 1.2em;
        width: 90%;
        max-width: 90%;
        margin: 0 5%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .command-card-header{
        width: 90%;
        margin: 0;
        padding: 5%;
        font-weight: bolder;
      }

      .command-card-body{
        min-height: 2em;
        margin-bottom: 1em;
      }

      .command-card-footer{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;

        .command-card-tag{
          font-size: 0.7em;
          display: inline-block;
          padding: 0.2em;
          margin: 0.1em;
        }
      }

    }

  }

</style>
