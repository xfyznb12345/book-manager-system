let code = result.code
      let str = ''
      var Regx = /^[A-Za-z]*$/;
      let isOk = true
      let arr = []
      for (let key of code){
        if(isOk && Regx.test(key)){
          str+=key
        }else{
          const x = parseInt(key)
          if(typeof(x) === 'number'){
            str+= key
          } else if (Regx.test(key)){
            arr.push(str)
            str = key
          }
        }
      }
      console.log(arr)