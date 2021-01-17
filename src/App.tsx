import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup: () => {
    return () => {
      return <div>hello vue3</div>;
    };
  }
});
