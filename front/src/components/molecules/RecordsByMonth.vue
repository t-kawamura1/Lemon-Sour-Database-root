<template>
  <div class="records-by-month">
    <div class="records-by-month-title">
      {{ japaneseThisYearMonth }}の合計記録
    </div>
    <input-month
      class="records-by-month-date-select"
      :value-text="selectedDate"
      @input="displayAmountsBy"
    ></input-month>
    <div class="records-by-month-pure-alcohol">
      純アルコール量 : {{ totalPureAlcohol }} g
    </div>
    <div class="records-by-month-drinking-amount">
      飲酒量 : {{ totalDrinking }} ml
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommonData from "@/mixins/common-data";
import CommonMethods from "@/mixins/common-methods";
import InputMonth from "@/components/atoms/InputMonth";

export default {
  mixins: [CommonData, CommonMethods],
  components: {
    InputMonth,
  },
  data() {
    return {
      amountsByMonth: [],
      numericThisYearMonth: "",
      japaneseThisYearMonth: "",
      selectedDate: "",
      totalPureAlcoholByMonth: "",
      totalDrinkingByMonth: "",
    };
  },
  computed: {
    totalPureAlcohol() {
      return parseFloat(this.totalPureAlcoholByMonth).toFixed(1);
    },
    totalDrinking() {
      return this.totalDrinkingByMonth;
    },
  },
  methods: {
    convertNumericDateToJapaneseDate(yearMonthString) {
      const oneDigitMonth = /\d{4}-0\d{1}/g;
      if (oneDigitMonth.test(yearMonthString)) {
        return `${yearMonthString.replace(" ", "").replace("-0", "年")}月`;
      } else {
        return `${yearMonthString.replace(" ", "").replace("-", "年")}月`;
      }
    },
    covertNumericDateToMonthWithZero(yearMonthString) {
      const oneDigitMonth = /\d{4}-\d{1}/g;
      if (oneDigitMonth.test(yearMonthString)) {
        return `${yearMonthString.replace(" ", "").replace("-", "-0")}`;
      } else {
        return yearMonthString;
      }
    },
    setNumericThisYearMonth() {
      const today = new Date();
      const yearMonth =
        today.getFullYear().toString() +
        "-" +
        (today.getMonth() + 1).toString();
      this.numericThisYearMonth =
        this.covertNumericDateToMonthWithZero(yearMonth);
    },
    displayAmountsBy(yearMonth) {
      // inputのvalueの末尾になぜか空白が入っているので除去。
      const replacedYM = yearMonth.replace(" ", "");
      this.selectedDate = replacedYM;
      this.japaneseThisYearMonth =
        this.convertNumericDateToJapaneseDate(replacedYM);
      const thisMonthRecord = this.amountsByMonth.find(
        (ele) => ele.year_month == replacedYM
      );
      if (thisMonthRecord === undefined) {
        this.totalPureAlcoholByMonth = 0;
        this.totalDrinkingByMonth = 0;
      } else {
        this.totalPureAlcoholByMonth = thisMonthRecord.total_pure_alcohol;
        this.totalDrinkingByMonth = thisMonthRecord.total_drinking;
      }
    },
  },
  created() {
    this.setNumericThisYearMonth();
    this.selectedDate = this.numericThisYearMonth;
  },
  mounted() {
    this.decryptHeaders();
    axios
      .get("/api/v1/drinking_records/amounts_by_month", {
        headers: this.authHeader,
      })
      .then((res) => {
        this.amountsByMonth = res.data;
        this.displayAmountsBy(this.numericThisYearMonth);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped lang="scss">
.records-by-month {
  .records-by-month-title {
    font-size: 1.8rem;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
  .records-by-month-date-select {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  .records-by-month-pure-alcohol {
    font-size: 1.8rem;
    margin-bottom: 10px;
    text-align: right;
    font-weight: 700;
  }
  .records-by-month-drinking-amount {
    font-size: 1.8rem;
    text-align: right;
    font-weight: 700;
  }
}
</style>
