<template>
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div style="max-width: 75%;" class="box is-size-7-mobile is-size-3-desktop has-text-centered">
        <!-- Your modal content goes here -->
        <h1 class="titleText"> {{ title }} </h1>
        <p class="textWrapping">{{ modalText }}</p>
        <button class="modalButton" @click="closeModal">Close</button>
      </div>
    </div>
    <div v-else>
        <button class="modalButton" @click="openModal">More Info</button>
    </div>
</template>
  
<script>
  export default {
    props: {
      modalText: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isModalOpen: false,
      };
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(3, 3, 3, 0.438);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 80%; /* Set a maximum width for the modal */
    /* height */
    z-index: 9999;
  }

  .modalButton
  {
    color: rgb(129, 47, 47);
    background-color: white;
    border: 2px solid rgb(122, 33, 33);
    border-radius: 5px;
    padding: 5px;
    margin: 5px;

  }

@media (min-width:320px) {
.textWrapping {
    /* Reset styles */
    margin: 0;
    padding: 0;
    display: inline; /* or block, depending on your layout */
    width: 100px;
    max-width: 50%; /* Ensure it doesn't exceed the parent width */
    overflow: visible !important; /* Or hidden, depending on your design */
    
    /* Wrap text when it goes off screen */
    overflow-wrap: break-word !important;
    font-size: 15px;
}

h1 {
  font-weight: bold;
  font-size: 3em;
    }
}

@media (min-width:961px)  {
  .textWrapping {
    /* Reset styles */
    margin: 0;
    padding: 0;
    display: inline; /* or block, depending on your layout */
    width: 100px;
    max-width: 50%; /* Ensure it doesn't exceed the parent width */
    overflow: visible !important; /* Or hidden, depending on your design */
    
    /* Wrap text when it goes off screen */
    overflow-wrap: break-word !important;
    font-size: 30px;
}

h1 {
  font-weight: bold;
  font-size: 3em;
  }

}

</style>
  