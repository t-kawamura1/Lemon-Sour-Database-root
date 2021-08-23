<template>
  <div class="sp-selects-set">
    <form class="sp-selects-form" @submit.prevent="packSelectedValues">
      <div class="sp-input-selects">
        <input-select
          class="sp-input-select"
          :sort-type="selectsTypes[0]"
          :sort-values="selectsManufacturers"
          :init-value="selectsManufacturers[0]"
          @input="selectedManufacturer = $event"
        ></input-select>
        <input-select
          class="sp-input-select"
          :sort-type="selectsTypes[1]"
          :sort-values="selectsIngredients"
          :init-value="selectsIngredients[0]"
          @input="selectedIngredient = $event"
        ></input-select>
        <input-select
          class="sp-input-select"
          :sort-type="selectsTypes[2]"
          :sort-values="selectsOrders"
          :init-value="selectsOrders[0]"
          @input="selectedOrder = $event"
        ></input-select>
      </div>
      <button-search class="sp-search-button"></button-search>
    </form>
    <div
      class="sp-selects-errors"
      v-for="(errorMessage, index) in errorMessages"
      :key="index"
    >
      <error-message :error-message-text="errorMessage"></error-message>
    </div>
  </div>
</template>

<script>
import InputSelect from "@/components/atoms/InputSelect";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import ButtonSearch from "@/components/atoms/ButtonSearch";

export default {
  components: {
    InputSelect,
    ErrorMessage,
    ButtonSearch,
  },
  data() {
    return {
      selectedManufacturer: "",
      selectedIngredient: "",
      selectedOrder: "",
      selectedValues: [],
    };
  },
  props: {
    selectsTypes: Array,
    selectsManufacturers: Array,
    selectsIngredients: Array,
    selectsOrders: Array,
    errorMessages: Array,
  },
  methods: {
    packSelectedValues() {
      this.selectedValues.push(this.selectedManufacturer);
      this.selectedValues.push(this.selectedIngredient);
      this.selectedValues.push(this.selectedOrder);
      this.$emit("sortBy", this.selectedValues);
      this.selectedValues = [];
    },
  },
};
</script>

<style scoped lang="scss">
.sp-selects-set {
  .sp-selects-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .sp-input-selects {
      display: flex;
      .sp-input-select {
        padding: 3px 0;
        width: 105px;
        font-size: 1rem;
        margin: 0 1px 10px 0;
      }
    }
    .sp-search-button {
      padding: 3px 0;
      font-size: 1rem;
      width: 120px;
    }
  }
  .sp-selects-errors {
    margin-top: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
}
</style>
