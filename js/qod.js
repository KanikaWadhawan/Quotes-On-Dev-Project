(function($){
    $(function(){

        //Get request for wp/v2/posts

        $('#new-quote-button').on('click', function(event){




            event.preventDefault();

            $.ajax({

                method: 'get',
                url: qod_api.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
            }).done(function(data){


            //  $('.entry-content').html();
            const $element = $('.entry-content');
            const $content = data[0].content.rendered;
            const $title = $('.entry-title');
            const $author = data[0].title.rendered;
            let $source, $source_url;

            $element.html( $content );
            

            if ( data[0]._qod_quote_source && 
                 data[0]._qod_quote_source_url ){
                    $source = data[0]._qod_quote_source;
                    $source_url = data[0]._qod_quote_source_url;
                    
                   
                    $title.html( `
                    — <span class="author">${$author}</span>, 
                    <span class="source">
                        <a href="${$source_url}">
                        ${$source}
                        </a>
                    </span>` );
                } else if( data[0]._qod_quote_source ){
                    $source = data[0]._qod_quote_source;
                    $title.html(`
                        — <span class="author">${$author}</span>, 
                        <span class="source">
                        ${$source}
                        </span>
                    `);
                   
                } else {
                    $title.html(`
                        — <span class="author">${$author}</span>
                    `);
                   
                }

            }).fail(function(err){

                console.log('error',err);
            });
 });

           // Post request for wp/v2/posts
           
        // 2. Post request for wp/v2/posts
        $('#quote-submission-form').on('submit', function(event){
            event.preventDefault();
​
            let $valAuthor = $('#quote-author').val().trim().length < 1 ? null:$('#quote-author').val(),
                $valContent = $('#quote-content').val().trim().length < 1 ? null:$('#quote-content').val(),
                $valSource = $('#quote-source').val().trim().length < 1 ? null:$('#quote-source').val(),
                $valUrl = $('#quote-source-url').val().trim().length < 1 ? null:$('#quote-source-url').val();
​
            $.ajax({
                method: 'post',
                url: qod_api.rest_url + 'wp/v2/posts',
                data: {
                    'title': $valAuthor,
                    'content': $valContent,
                    '_qod_quote_source':$valSource,
                    '_qod_quote_source_url':$valUrl
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader( 'X-WP-Nonce', qod_api.wpapi_nonce );
                }
            })
            .fail(function(err){
                console.log(err);
            })
            .done(function(){
                $('.quote-submission-wrapper').html('Thanks, your quote submission was received!');
            });
        });
  
​

});

})(jQuery);