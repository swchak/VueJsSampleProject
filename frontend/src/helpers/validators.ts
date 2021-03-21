export const validators = {
  required(field) {
    ;[
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters'
    ]
  }
}