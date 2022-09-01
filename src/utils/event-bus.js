class CustomEventBus {
  constructor() {
    this.store = {};
  }

  isArray(bus) {
    return bus instanceof Array;
  }

  isNotNull(bus) {
    return this.isArray(bus) && bus.length > 0;
  }

  findCallback(bus, cb) {
    let i = 0;
    for (i; i < bus.length; i++) {
      if (cb == bus[i]) {
        return i;
      }
    }
    return -1;
  }

  listen(name, cb) {
    if (!this.isArray(this.store[name])) {
      this.store[name] = [];
    }
    this.store[name].push(cb);
  }

  remove(name, cb) {
    const eventBus = this.store[name];
    if (!cb) {
      this.store[name] = [];
    } else if (this.isNotNull(eventBus)) {
      const i = this.findCallback(eventBus, cb);
      if (i > -1) {
        eventBus.splice(i, 1);
        this.store[name] = eventBus;
      }
    }
  }

  trigger(name, detail) {
    return new Promise((resolve, reject) => {
      if (this.isNotNull(this.store[name])) {
        this.store[name].map(cb => {
          resolve(cb(detail));
        });
      }
    });
  }
}

export const EventBus = new CustomEventBus();
