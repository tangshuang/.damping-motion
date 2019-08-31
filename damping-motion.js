/**
 * 加速器，用以测量加速动能，可获得加速度
 */
class Accelerometer {
  constructor() {
    this.points = []
  }

  /**
   * 记录物体运动轨迹
   * @param {*} distance 加速之后达到多少距离
   */
  push(distance) {
    this.points.push({
      distance,
      time: Date.now(),
    })
  }

  /**
   * 获得加速度
   */
  acceleration() {
    const points = this.points
    const len = points.length

    const speed0 = (points[1].distance - points[0].distance) / (points[1].time - points[0].time)
    const speed$ = (points[len - 1].distance - points[len - 2].distance) / (points[len - 1].time - points[len - 2].time)
    const time = points[len - 1].time - points[0].time

    const acceleration = (speed$ - speed0) / time
    return acceleration
  }
}

/**
 * 助推器，获得加速度之后，可测量任意时间点上的速度和距离
 */
class Booster extends Accelerometer {
  // 根据时间获取加速后速度
  speed(time) {
    const acceleration = this.acceleration()
    const speed = acceleration * time
    return speed
  }
  // 根据当前时间获取当前速度
  distance(time) {
    const acceleration = this.acceleration()
    const distance = acceleration * time * time / 2
    return distance
  }
}

/**
 * 带摩擦的惯性运动
 */
class Inertia extends Accelerometer {
  /**
   * @param {*} u
   */
  constructor(u) {
    this.u = u
  }
  /**
   * 摩擦减速度
   */
  deceleration() {
    const points = this.points
    const len = points.length

    const speed0 = (points[1].distance - points[0].distance) / (points[1].time - points[0].time)
    const speed$ = (points[len - 1].distance - points[len - 2].distance) / (points[len - 1].time - points[len - 2].time)
    const time$ = points[len - 1].time
    const time0 = points[0].time

    const acceleration = (speed$ - speed0) / (time$ - time0)
    const { u } = this

    const deceleration = u * acceleration / (1 - u)
    return deceleration
  }
  speed(time) {
    const points = this.points
    const len = points.length
    const time$ = points[len - 1].time
    const acceleration = this.acceleration()

    if (time <= time$) {
      const speed = acceleration * time
      return speed
    }
    else {
      const deceleration = this.deceleration()
      const speed$ = acceleration * time$
      const speed = speed$ - deceleration * (time - time$)
      return speed
    }
  }
  distance(time) {
    const points = this.points
    const len = points.length
    const time$ = points[len - 1].time
    const acceleration = this.acceleration()

    if (time <= time$) {
      const distance = acceleration * time * time / 2
      return distance
    }
    else {
      const pass = acceleration * time$ * time$ / 2
      const t = time$ - time
      const speed$ = acceleration * time$
      const deceleration = this.deceleration()
      const s = speed$ * t - deceleration * time * time / 2
      const distance = pass + s
      return distance
    }
  }
}

/**
 * 阻尼振动
 */
class Dumper extends Accelerometer {}
