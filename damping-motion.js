class Booster {
  constructor() {
    this.points = []
  }

  /**
   * 记录物体运动轨迹
   * @param {*} distance 加速之后达到多少距离
   */
  move(distance) {
    this.points.push({
      distance,
      time: Date.now(),
    })
  }

  /**
   * 获得加速度
   */
  accelerator() {
    const points = this.points
    const len = points.length

    const speed0 = (points[1].distance - points[0].distance) / (points[1].time - points[0].time)
    const speed$ = (points[len - 1].distance - points[len - 2].distance) / (points[len - 1].time - points[len - 2].time)
    const time = points[len - 1].time - points[0].time

    const accelerator = (speed$ - speed0) / time
    return accelerator
  }
}

class Accelerometer extends Booster {
  // 根据时间获取加速后速度
  speed(time) {
    const accelerator = this.accelerator()
    const speed = accelerator * time
    return speed
  }
  // 根据当前时间获取当前速度
  distance(time) {
    const accelerator = this.accelerator()
    const distance = accelerator * time * time / 2
    return distance
  }
}

class Damper extends Booster {
  /**
   * @param {*} damping 一个 [0, 1] 的数字
   */
  constructor(damping) {
    super()
    this.damping = damping
  }
  // 根据时间获取阻尼后速度
  speed(time) {
    // const points = this.points
    // const len = points.length

    // const speed0 = (points[1].distance - points[0].distance) / (points[1].time - points[0].time)
    // const speed$ = (points[len - 1].distance - points[len - 2].distance) / (points[len - 1].time - points[len - 2].time)
    // const time0 = points[len - 1].time
    // const time$ = points[0].time

    // if (time <= time0) {
    //   return 0
    // }

    // if (time > time0 && time <= time$) {
    //   const factor = (time - time0) / (time$ - time0)
    //   const speed = speed0 + (speed$ - speed0) * factor
    //   return speed
    // }

    // if (time > time$) {
    //   const u = this.damping
    //   const range = time - time$
    //   const accelerator = (speed$ - speed0) / (time$ - time0) * (1 - u * range) // 阻尼系数使加速度变小，且随着时间的推移这个系数带来的影响越来越大
    //   const speed = speed$ + accelerator * range
    //   return speed
    // }
  }
  // 根据当前时间获取当前速度
  distance(time) {

  }
}
