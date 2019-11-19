const { merge, interval, Observable, asyncScheduler, Subject,  } = require('rxjs');
const { take, observeOn,  } = require('rxjs/operators');

const subject = new Subject();
// 将 observer1 添加到观察者列表
const sub1 = subject.subscribe(new Observable((s)=>{
  s.next(1)
}));
// 将 observer2 添加到观察者列表
const sub2 = subject.subscribe(new Observable((s)=>{
  s.next(2)
}));
// 使用 "hi there" 来通知列表中的所有观察者
subject.next('hi there');
// 将 observer1 从观察者列表中移除
sub1.unsubscribe();
