let cats = "";

$(function()    {
    $.ajax ({
        url: 'http://blacatzacademy.com/api/products',
        type: 'get',
        success: function(response) {
            cats = response;
            show(cats);
            
            $('#show').click(function() {
                filterCats(cats);
            });
        }
    }); 
})

function show(chosen)  {
    let html = "";
    html += '<table>';
    html += '<th>Name</th><th>Category</th><th>Price</th><th>Quantity</th>';

    for (let i = 0; i< chosen.length; i++)  {
        html += '<tr>';
        html += `<td class="t-c">${chosen[i].name}</td>`;
        html += `<td>${chosen[i].category}</td>`;
        html += `<td>${chosen[i].price}</td>`;
        html += `<td>${chosen[i].quantity}</td>`;
        html += '</tr>';
    }

    html += '</table';
    $('#container').html(html);
}

function filterCats(all)    {
    let rest = all;    
    let from = $('#from').val();
    from = parseInt(from);
    let to = $('#to').val();
    to = parseInt(to);

    if ($.isNumeric(from))   {
        rest = rest.filter (r => parseInt(r.price) >= from);
    }

    if ($.isNumeric(to))   {
        rest = rest.filter (r => parseInt(r.price) < to);
    }

    if ($('#cat1').is(':checked'))    {
        if ($('#cat2').is(':checked'))    {
            if ($('#cat3').is(':checked'))    {
                rest = rest;
            }   
            else    {
                rest = rest.filter 
                    (r => (r.category == 'cat1')|| (r.category == 'cat2'));
            }
        }   
        else    {
            if ($('#cat3').is(':checked'))    {
                rest = rest.filter 
                    (r => (r.category == 'cat1')|| (r.category == 'cat3'));
            }
            else    {
                rest = rest.filter (r => r.category == 'cat1');
            }
        }
    }
    else    {
        if ($('#cat2').is(':checked'))    {
            if ($('#cat3').is(':checked'))    {
                rest = rest.filter
                    (r => (r.category == 'cat2')|| (r.category == 'cat3'));
            }   
            else    {
                rest = rest.filter 
                    (r => r.category == 'cat2');
            }
        }   
        else    {
            if ($('#cat3').is(':checked'))    {
                rest = rest.filter 
                    (r => r.category == 'cat3');
            }
            else    {
                rest = rest;
            }
        }
    }

    show(rest);
}