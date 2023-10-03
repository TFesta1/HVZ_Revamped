<template>
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div style="max-width: 50%;" class="box is-size-5-mobile is-size-1-desktop has-text-centered">
        <!-- Your modal content goes here -->
        <p class="textWrapping">{{ modalText }}</p>
        <button class="modalButton" @click="closeModal">Close</button>
      </div>
    </div>
    <div v-else>
        <button class="modalButton" @click="openModal">?</button>
    </div>
</template>
  
<script>
  export default {
    props: {
      modalText: {
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
    background: rgba(3, 3, 3, 0.5);
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
    color: red;
    background-color: white;
    border: 2px solid red;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;

  }
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
    font-size: 20px;
}

</style>
  