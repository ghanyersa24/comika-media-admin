 <template>
  <div class="row">
    <div class="col-md-3">
      <label :for="idName" class="text-capitalize h6 mt-3">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <div>
        <editor :id="idName" v-model="data" api-key="2w6ae4ybr4bocsjp42wtfo5pr3rm0d7k9xsa7y7ga3k86qwh" :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }" />
      </div>
    </div>
  </div>
</template>

 <script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  props: {
    name: String,
    noRequired: {
      type: Boolean,
      default: false,
    },
    val: String,
  },
  computed: {
    idName() {
      return this.name.replace(/ /g, "");
    },
    data: {
      get() {
        return this.val;
      },
      set(val) {
        this.$emit("get", val);
      },
    },
  },
};
</script>
