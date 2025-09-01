<script lang="ts">
  export let as: keyof HTMLElementTagNameMap = 'span';
  export let className = '';
  let Tag: any = as;
</script>

<Tag class={`sr-only ${className}`}><slot /></Tag>

