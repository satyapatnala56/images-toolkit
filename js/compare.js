$(document).ready(function () {
  var file1, file2
  var second_container_activation = ''
  var input1_selectors = {
    box: '#box1',
    container: '#first_container',
    boxborder: '#box-border-1',
    imgdiv: 'img_div',
    inputimg: 'input_img',
  }
  var input2_selectors = {
    box: '#box2',
    container: '#second_container',
    boxborder: '#box-border-2',
    imgdiv: 'img_div2',
    inputimg: 'input_img2',
  }
  function drag_drop_error_checking(file, error_selector) {
    var extension = file.name.replace(/^.*\./, '')
    if (
      extension == 'webp' ||
      extension == 'png' ||
      extension == 'jpg' ||
      extension == 'jpeg'
    ) {
      if (error_selector == '.error2') {
        if (second_container_activation == 'file_one_uploaded') {
          input_operation(file, input2_selectors, 0)
          $('.comparison_input').css({ opacity: 0.2 })
          $('#loading_id').css({ visibility: 'visible' })
          setTimeout(comparison_operation, 3000)
        } else {
          $(error_selector).css({
            'padding-top': '10px',
            'padding-bottom': '10px',
          })
          $(error_selector).html('Upload first file')
        }
      } else {
        input_operation(file, input1_selectors, 0)
        second_container_activation = 'file_one_uploaded'
      }
    } else {
      $(error_selector).css({
        'padding-top': '10px',
        'padding-bottom': '10px',
      })
      $(error_selector).html('File not supported')
    }
  }
  /////drag and drop
  $('#first_container').on('dragover', function (e) {
    e.preventDefault()
  })

  $('#first_container').on('drop', function (e) {
    e.preventDefault()
    file1 = e.originalEvent.dataTransfer.files[0]
    drag_drop_error_checking(file1, '.error1')
  })
  $('#second_container').on('dragover', function (e) {
    e.preventDefault()
  })
  $('#second_container').on('drop', function (e) {
    e.preventDefault()
    file2 = e.originalEvent.dataTransfer.files[0]
    drag_drop_error_checking(file2, '.error2')
  })
  //////on drag and drop end

  /////onchange event
  $('#Inputbox1').click(function () {
    $('#file1').click()
    $('#file1').on('change', function (e) {
      file1 = e.target.files[0]

      input_operation(file1, input1_selectors, 0)
    })
  })
  $('#Inputbox2').click(function () {
    $('#file2').click()

    $('#file2').on('change', function (e) {
      file2 = e.target.files[0]

      input_operation(file2, input2_selectors, 1)
      $('.comparison_input').css({ opacity: 0.2 })
      $('#loading_id').css({ visibility: 'visible' })
      setTimeout(comparison_operation, 3000)
    })
  })

  /////onchange event end
  function option_btn_color(id) {
    $('#fade,#difference,#slide,#split,#detail,#downloadable').css({
      background: 'rgba(230, 230, 230)',
      color: 'black',
    })
    $('#' + id).css({
      background: '#6c757d',
      color: 'white',
    })
  }

  /////main processing function
  function comparison_operation() {
    $('#parent_element').css({ height: 'auto' })

    $('#loading_id').remove()
    $('.comparison_input').css({ display: 'none' })
    $('.content_div').css({ display: 'block' })
    var reader = new FileReader()
    reader.onload = function () {
      var url1 = reader.result
      var reader2 = new FileReader()
      reader2.onload = function () {
        var url2 = reader2.result
        $('#first_img').html(file1.name)
        $('#second_img').html(file2.name)

        $('#split').on('click', function () {
          document.querySelector('.options').style.display = 'none'
          document.querySelector('.file_name_div').style.display = 'flex'
          option_btn_color('split')

          $('.output_div').css({
            'background-color': 'white',
            'padding-top': '10px',
          })
          $('.output_div').html(
            '<div class="split_container"> <div class="split_img"><img src="" alt="" id="img1"/></div> <div class="margin_div"></div> <div class="split_img"> <img id="img2" src="" alt="" /> </div> </div>'
          )
          $('#img1').attr('src', url1)
          $('#img2').attr('src', url2)
        })

        /////fade button
        $('#fade').click(function () {
          document.querySelector('.options').style.display = 'none'
          document.querySelector('.file_name_div').style.display = 'flex'
          option_btn_color('fade')
          $('.output_div').css({
            'background-color': 'rgba(240,240,240)',
            'padding-top': '20px',
          })
          $('.output_div').html(
            '<div class="fade_container"><img src="" alt=""></div>'
          )
          $('.fade_container').css({
            background: 'url(' + url1 + ')',
            'background-size': '100% 100%',
            'background-repeat': 'no-repeat',
          })
          $('.fade_container img').attr('src', url2)
        })
        $('#difference').click(function () {
          document.querySelector('.options').style.display = 'none'
          document.querySelector('.file_name_div').style.display = 'flex'
          option_btn_color('difference')

          $('.output_div').css({
            'background-color': 'rgba(240,240,240)',
            'padding-top': '20px',
          })
          var img = new Image()
          img.onload = function () {
            var img2 = new Image()
            img2.onload = function () {
              var diff = imagediff.diff(img, img2)
              var canvas = imagediff.createCanvas(diff.width, diff.height)
              var context = canvas.getContext('2d')
              context.putImageData(diff, 0, 0)
              var url = canvas.toDataURL()
              $('.output_div').html(
                '<div id="difference_container"><img src="" alt=""></div>'
              )

              $('#difference_container img').attr('src', url)
            }
            img2.src = url2
          }
          img.src = url1
        })
        $('#detail').click(function () {
          document.querySelector('.options').style.display = 'none'
          document.querySelector('.file_name_div').style.display = 'flex'
          option_btn_color('detail')

          $('.output_div').html(
            ' <div class="table_container"> <table class="table table1" > <thead class="thead-dark"> <tr> <th scope="col">Property</th> <th scope="col">Value</th> </tr> </thead> <tbody> <tr> <td>Name</td> <td>' +
              file1.name +
              '</td> </tr> <tr> <td>Size</td> <td>' +
              file1.size +
              '</td> </tr> <tr> <td>Type</td> <td>' +
              file1.type +
              '</td> </tr> <tr> <td>Last Modified</td> <td>' +
              file1.lastModifiedDate +
              '</td> </tr> </tbody> </table> <table class="table table2" > <thead class="thead-dark"> <tr> <th scope="col">Property</th> <th scope="col">Value</th> </tr> </thead> <tbody> <tr> <td>Name</td> <td>' +
              file2.name +
              '</td> </tr> <tr> <td>Size</td> <td>' +
              file2.size +
              '</td> </tr> <tr> <td>type</td> <td>' +
              file2.type +
              '</td> </tr> <tr> <td>lastModifiedDate</td> <td>' +
              file2.lastModifiedDate +
              '</td> </tr> </tbody> </table> </div>'
          )
        })
        $('#downloadable').click(function () {
          option_btn_color('downloadable')
          document.querySelector('.options').style.display = 'flex'
          document.querySelector('.file_name_div').style.display = 'none'
          let colorCode = document.querySelector('#color').value.split(',')
          colorCode = [
            Number(colorCode[0]),
            Number(colorCode[1]),
            Number(colorCode[2]),
          ]
          let thresholdValue = Number(
            document.querySelector('#threshold').value
          )
          let threshold = thresholdValue / 100
          document.querySelector('#color').addEventListener('change', () => {
            $('#downloadable').click()
          })
          document
            .querySelector('#threshold')
            .addEventListener('change', (e) => {
              let thresholdValue = Number(
                document.querySelector('#threshold').value
              )
              let threshold =
                thresholdValue > 100 || thresholdValue < 1 ? 10 : thresholdValue
              e.target.value = threshold
              $('#downloadable').click()
            })
          const canvases = [...document.querySelectorAll('canvas')]
          canvases.forEach((e) => {
            e.width = e.height = 0
          })
          $('.output_div').css({
            'background-color': 'rgba(240,240,240)',
            'padding-top': '20px',
          })
          let createCanvas = () => {
            const canvas = document.createElement('canvas')
            const image = new Image()
            image.addEventListener('load', () => {
              canvas.width = image.width
              canvas.height = image.height
              canvas.getContext('2d').drawImage(image, 0, 0)
              canvases[0] = canvas
              createNewCanvas()
            })
            image.src = URL.createObjectURL(file1)
          }
          let createNewCanvas = () => {
            const canvas = document.createElement('canvas')
            const image = new Image()
            image.addEventListener('load', () => {
              canvas.width = image.width
              canvas.height = image.height
              canvas.getContext('2d').drawImage(image, 0, 0)
              canvases[1] = canvas
              compareCanvases()
            })
            image.src = URL.createObjectURL(file2)
          }
          createCanvas()
          function compareCanvases() {
            const img1Ctx = canvases[0].getContext('2d')
            const img2Ctx = canvases[1].getContext('2d')
            const canvas = document.createElement('canvas')
            canvases[2] = canvas
            const diffCtx = canvases[2].getContext('2d')
            const { width, height } = canvases[0]
            canvases[2].width = width
            canvases[2].height = height

            const img1 = img1Ctx.getImageData(0, 0, width, height)
            const img2 = img2Ctx.getImageData(0, 0, width, height)
            const diff = diffCtx.createImageData(width, height)

            const diffCount = pixelmatch(
              img1.data,
              img2.data,
              diff.data,
              width,
              height,
              { threshold: Number(threshold), diffColor: colorCode }
            )
            diffCtx.putImageData(diff, 0, 0)
            document.querySelector(
              '.output_div'
            ).innerHTML = `<div class='compare-img-result d-flex flex-column  align-items-center justify-content-center'>
           <div class="font-weight-bold my-3">${diffCount} different pixels found</div>`
            let imageSrc = canvases[2].toDataURL('image/png')
            let imageTag = document.createElement('img')
            imageTag.src = imageSrc
            document.querySelector('.compare-img-result').appendChild(imageTag)
          }
        })
        $('#slide').click(function () {
          document.querySelector('.options').style.display = 'none'
          document.querySelector('.file_name_div').style.display = 'flex'
          option_btn_color('slide')

          $('.output_div').html(
            '<div class="slider_container"> <div class="slider_img_one"> <div class="bar"> <div class="slider_circle"></div> </div> <input type="range" id="slider_range" min="0" max="100" /> <div class="slider_img_two"></div> </div> </div>'
          )
          var height = document.querySelector('.slider_container').offsetHeight
          var width = document.querySelector('.slider_container').offsetWidth

          document.querySelector('.slider_img_one').style.background =
            "url('" + url1 + "') no-repeat"
          document.querySelector('.slider_img_two').style.background =
            "url('" + url2 + "') no-repeat"

          document.querySelector('.slider_img_one').style.backgroundSize =
            width + 'px' + ' ' + height + 'px'
          document.querySelector('.slider_img_two').style.backgroundSize =
            width + 'px' + ' ' + height + 'px'

          $('#slider_range').on('input', function () {
            $('.slider_img_two').css({
              width: $('#slider_range').val() + '%',
            })
            $('.bar').css({
              'margin-left': $('#slider_range').val() + '%',
            })
            $('.slider_circle').css({
              'margin-left': $('#slider_range').val() + '%',
            })
          })
        })
        $('#slide').click()
      }
      reader2.readAsDataURL(file2)
    }
    reader.readAsDataURL(file1)
  }

  function input_operation(file, selector_arr, input_flag) {
    $(selector_arr.container).css({ height: 'auto' })

    $(selector_arr.container).css({ background: 'rgba(0, 0, 0, 0.10)' })
    $(selector_arr.boxborder).css({ background: 'none', border: 'none' })

    $(selector_arr.box).css({
      background: 'white',
      border: '2px dashed rgba(0, 0, 0, 0.30)',
    })

    $(selector_arr.container).html(
      '<div id=' +
        selector_arr.imgdiv +
        '><img id=' +
        selector_arr.inputimg +
        " src=''></div><p style='color:green;font-size:16px;font-weight:bold;margin-top:10px;text-align:center'>FILE UPLOADED !!!</p>"
    )
    var reader = new FileReader()
    reader.onload = () => {
      $('#' + selector_arr.inputimg).attr('src', reader.result)
    }
    reader.readAsDataURL(file)
    if (input_flag == 0) {
      $('#file2').removeAttr('disabled')
    }
  }
})
