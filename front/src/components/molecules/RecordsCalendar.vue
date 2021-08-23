<template>
  <div class="records-calendar">
    <v-calendar
      class="records-calendar-v-calendar"
      is-expanded
      :attributes="recordAttributes"
    >
      <template slot="header-title" slot-scope="page">
        {{ page.yearLabel }}年{{ page.monthLabel }}
      </template>
    </v-calendar>
    <calendar-explanation
      class="records-calendar-explanation"
      v-for="(colorAndText, index) in colorsAndTexts"
      :key="index"
      :explanationSet="colorAndText"
    ></calendar-explanation>
  </div>
</template>

<script>
import CalendarExplanation from "@/components/atoms/CalendarExplanation";

export default {
  components: {
    CalendarExplanation,
  },
  props: {
    recordsLessThanTwenty: Array,
    recordsFromTwentyToThirtyNine: Array,
    recordsFortyOrMore: Array,
    recordsDateAndSour: Array,
    colorsAndTexts: Array,
  },
  computed: {
    recordAttributes() {
      return [
        ...this.recordsLessThanTwenty.map((record) => ({
          dates: record.drinking_date,
          highlight: {
            class: "highlight-bg-green",
          },
          popover: {
            label: `総純アルコール量:${record.total_pure_alcohol}g  総飲酒量:${record.total_drinking}ml`,
            visibility: "click",
            hideIndicator: true,
          },
        })),
        ...this.recordsFromTwentyToThirtyNine.map((record) => ({
          dates: record.drinking_date,
          highlight: {
            class: "highlight-bg-yellow",
          },
          popover: {
            label: `総純アルコール量:${record.total_pure_alcohol}g  総飲酒量:${record.total_drinking}ml`,
            visibility: "click",
            hideIndicator: true,
          },
        })),
        ...this.recordsFortyOrMore.map((record) => ({
          dates: record.drinking_date,
          highlight: {
            class: "highlight-bg-red",
          },
          popover: {
            label: `総純アルコール量:${record.total_pure_alcohol}g  総飲酒量:${record.total_drinking}ml`,
            visibility: "click",
            hideIndicator: true,
          },
        })),
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.records-calendar {
  width: 300px;
  .records-calendar-v-calendar {
    margin-bottom: 20px;
  }
  .records-calendar-explanation {
    margin: 0 0 6px 20px;
  }
}
</style>

<style lang="scss">
.highlight-bg-green {
  background-color: $calendar-green;
}
.highlight-bg-yellow {
  background-color: $calendar-yellow;
}
.highlight-bg-red {
  background-color: $calendar-red;
}
</style>
