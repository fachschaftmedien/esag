<template>
  <div class="gallery-container">
    <div class="gallery-image-big-container"  v-touch:swipe.right="prev" v-touch:swipe.left="next">
      <div class="gallery-image-big-controls">
        <div class="left-button" @click="prev">
          <span class="fa fa-chevron-left"></span>
        </div>
        <div class="right-button" @click="next">
          <span class="fa fa-chevron-right"></span>
        </div>
      </div>
      <img class="gallery-image-big" v-lazy="current().src" :data-srcset="current().src" :alt="current().caption">
    </div>
    <div class="gallery-thumbnail-container" v-touch:swipe.right="prevPage" v-touch:swipe.left="nextPage">
      <div class="gallery-thumbnails">
        <div class="gallery-thumbnail" v-for="(image, index) in getImagesOfCurrentPage()">
          <img v-lazy="image.thumb" :data-srcset="image.thumb" :alt="image.caption" @click="setCurrent(getAbsoluteIndex(index))">
        </div>
      </div>
      <div class="gallery-thumbnail-controls">
        <div class="left-button" @click="prevPage">
          <span class="fa fa-caret-left left"></span>
          <span class="fa fa-caret-up up"></span>
        </div>
        <div class="right-button" @click="nextPage">
          <span class="fa fa-caret-right right"></span>
          <span class="fa fa-caret-down down"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Gallery',
    props:{
        images: Array,
        imageOfSeparator: {
            type: String,
            default: 'von'
        },
        imageBeforeCaption: {
            type: String,
            default: 'Bild'
        },
        imageAfterCaption: {
            type: String,
            default: '.'
        },
        imagesPerPage: {
            type: Number,
            default: 3
        }
    },
    data(){
        return {
          index: 0,
          page: 0
        };
    },
    computed: {
        progressString(){
            return this.imageBeforeCaption + ' ' + (this.index+1) + ' ' + this.imageOfSeparator + ' ' + this.images.length + ' ' + this.imageAfterCaption;
        },
        numberOfPages(){
          return Math.floor(this.images.length/this.imagesPerPage);
        },
    },
    methods: {
      current(){
        return this.images[this.index];
      },
      next(){
          this.index = this.index  === this.images.length-1 ? 0 : this.index+1;
      },
      prev(){
          this.index = this.index === 0 ? this.images.length-1 : this.index-1;
      },

      getImagesOfCurrentPage(){
          let start = this.page * this.imagesPerPage;
          let end = start + this.imagesPerPage;
          return this.images.slice(start, end);
      },
      nextPage(){
          this.page = this.page === this.numberOfPages-1 ? 0 : this.page+1;
      },
      prevPage(){
          this.page = this.page === 0 ? this.numberOfPages-1 : this.page-1;
      },
      setCurrent(i){
          this.index = i;
      },
      getAbsoluteIndex(index){
          return this.page * this.imagesPerPage + index;
      }
    }
  }

</script>

<style lang="scss">

  .gallery-container{
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    user-select: none;
  }

  .gallery-image-big-container, .gallery-thumbnail-container{
    width: 100%;
    height: 100%;
  }

  .gallery-image-big-container{
    position: relative;
    padding-bottom: 10%;
    width: 70%;
    height: auto;

    .gallery-image-big-controls{
      z-index: 11;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: transparent;
      mix-blend-mode: screen;

      .left-button, .right-button{
        width: 2em;
        height: 2em;
        border-radius: 1em;
        font-size: 1em;
        z-index: 12;
        background-color: rgba(250,250,250,0.95);
        cursor: pointer;
        margin: 0 0.2em;

        span{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
        }
      }

    }

    .gallery-image-big{
      z-index: 10;
      object-fit: cover;
    }

    .gallery-image-big-controls, .gallery-image-big{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

  }

  .gallery-thumbnail-container{
    position: relative;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .gallery-thumbnails, .gallery-thumbnail-controls{
      position: absolute;
      width: 100%;
      height: 100%
    }

    .gallery-thumbnail-controls{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: none;
      width: 100%;
      height: 100%;

      .left-button, .right-button{
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: auto;
        cursor: pointer;
        color: white;
        margin: 0 0.2em;
        cursor: pointer;
      }

      .up, .down{
        display: block;
      }

      .left, .right{
        display: none;
      }
    }

    .gallery-thumbnail{
      height: 33%;
      flex: 1;
      width: auto;
      margin: 1%;

      img{
        cursor: pointer;
        object-fit: contain;
        width: 100%;
        height: 100%;
      }

      img:hover{
        filter: contrast(110%) brightness(75%);
      }

      img[lazy=loading]{
        object-fit: initial !important;
        width: auto;
        height: auto;
      }
    }
  }

  @media (max-width: 1000px){
    main>.gallery .esag-images{

      .gallery-container{
        flex-direction: column;
      }

      .gallery-image-big-container, .gallery-thumbnail-container{
        width: 100%;
      }

      .gallery-container>.gallery-image-big-container{
        height: 70%;
      }

      .gallery-container>.gallery-thumbnail-container{
        height: 30%;

        .gallery-thumbnails{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .gallery-thumbnail{
            height: 90%;
            margin: 5% 0;
          }
        }

        .gallery-thumbnail-controls{
          flex-direction: row;

          .up, .down{
            display: none;
          }

          .left, .right{
            display: block;
          }
        }
      }
    }
  }

</style>
