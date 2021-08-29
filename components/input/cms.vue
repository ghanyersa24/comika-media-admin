 <template>
  <div class="row">
    <div class="col-md-3">
      <label :for="idName" class="text-capitalize h6 mt-3">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <div>
        <editor :id="idName" v-model="data" api-key="vhab1ebw15sac7nh163l3b22zlefl7p28wef23cg0b8jl8qc" :init="settings" />
      </div>
    </div>
  </div>
</template>

 <script>
import Editor from "@tinymce/tinymce-vue";
import axios from "axios";
export default {
  data() {
    return {
      settings: {
        height: 500,
        menubar: false,
        plugins: `table image link lists media autoresize 
                  preview media autoresize code emoticons hr 
                  image imagetools`,
        toolbar: `undo redo | styleselect table emoticons | indent outdent bullist numlist | hr media image | preview code`,
        style_formats: [
          {
            title: "Headers",
            items: [
              { title: "Header 1", format: "h1" },
              { title: "Header 2", format: "h2" },
              { title: "Header 3", format: "h3" },
              { title: "Header 4", format: "h4" },
              { title: "Header 5", format: "h5" },
              { title: "Header 6", format: "h6" },
            ],
          },
          {
            title: "Inline",
            items: [
              { title: "Bold", icon: "bold", format: "bold" },
              { title: "Italic", icon: "italic", format: "italic" },
              { title: "Underline", icon: "underline", format: "underline" },
              {
                title: "Strikethrough",
                icon: "strikethrough",
                format: "strikethrough",
              },
            ],
          },
          {
            title: "Blocks",
            items: [
              { title: "Paragraph", format: "p" },
              { title: "Blockquote", format: "blockquote" },
              { title: "Div", format: "div" },
            ],
          },
          {
            title: "Alignment",
            items: [
              { title: "Left", icon: "alignleft", format: "alignleft" },
              { title: "Center", icon: "aligncenter", format: "aligncenter" },
              { title: "Right", icon: "alignright", format: "alignright" },
              {
                title: "Justify",
                icon: "alignjustify",
                format: "alignjustify",
              },
            ],
          },
        ],
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        images_reuse_filename: true,
        images_upload_credentials: true,
        images_upload_handler: async function (
          blobInfo,
          success,
          failure,
          progress
        ) {
          const token = localStorage.getItem("auth._token.local");
          const formData = new FormData();
          formData.append("src", blobInfo.blob());
          formData.append("name", blobInfo.filename());
          try {
            const {
              data: { data },
            } = await axios.post(
              "https://api.comika.media/api/admin/source",
              formData,
              {
                headers: {
                  Authorization: token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            success(data.url);
          } catch (error) {
            failure(error.message);
          }
        },
      },
    };
  },
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
