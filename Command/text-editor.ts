export class TextEditor {
  private content = ''

  type(text: string) {
    this.content += text
  }
  deleteLast(n: number) {
    this.content = this.content.slice(0, -n)
  }
  getContent() {
    return this.content
  }
  get length() {
    return this.content.length
  }
}
