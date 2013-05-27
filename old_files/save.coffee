nodeio = require 'node.io'
class SavePage extends nodeio.JobClass
    input: false 
    run: () -> 
        url = @options.args[0]
        @get url, (err, data) =>
            if err? then @exit err else @emit data          
@class = SavePage
@job = new SavePage()
