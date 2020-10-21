<script>
import FileUpload from "@/components/file-upload";

export default {
  name: "App",
  components: {
    FileUpload
  },
  render(){
    return(
      <div class="container">
        <FileUpload/>
      </div>
    )
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
