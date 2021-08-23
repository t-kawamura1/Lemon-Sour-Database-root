<template>
  <div class="records-delete">
    <div class="records-delete-display-button" @click="isActive = !isActive">
      記録の削除はこちらをクリック
    </div>
    <div v-show="isActive">
      <div class="records-delete-guide">
        日付を選択して削除ボタンを押してください。
      </div>
      <error-message
        class="records-delete-error"
        :error-message-text="errorMessage"
      ></error-message>
      <day-date-picker
        class="records-delete-date-picker"
        @input="setDeleteDate"
      ></day-date-picker>
      <button-delete
        class="records-delete-button"
        :button-delete-text="buttonDelete"
        @delete="$emit('submit', deleteDate)"
      ></button-delete>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "@/components/atoms/ErrorMessage";
import DayDatePicker from "@/components/atoms/DayDatePicker";
import ButtonDelete from "@/components/atoms/ButtonDelete";

export default {
  components: {
    ErrorMessage,
    DayDatePicker,
    ButtonDelete,
  },
  props: {
    errorMessage: String,
    buttonDelete: String,
  },
  data() {
    return {
      isActive: false,
      deleteDate: "",
    };
  },
  methods: {
    setDeleteDate(date) {
      this.deleteDate = date;
    },
  },
};
</script>

<style scoped lang="scss">
.records-delete {
  margin-bottom: 10px;
  .records-delete-guide {
    color: $second-dark-yellow;
    margin-bottom: 6px;
  }
  .records-delete-error {
    margin-bottom: 6px;
  }
  .records-delete-date-picker {
    margin-right: 3px;
  }
  .records-delete-display-button {
    color: $second-dark-yellow;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
