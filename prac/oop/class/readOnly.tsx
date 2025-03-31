class ReadOnlyId {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }
  setId(id: number): void {
    // this.id = id; // Error: Cannot assign to 'id' because it is a read-only property.
  }
}

const only = new ReadOnlyId(1);
// only.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.

console.log(only.getId()); // 1
