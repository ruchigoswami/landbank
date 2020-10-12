import xmltodict
import urllib.request
import json
from  flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return "Ruchi"
## Some sample parcelids are 
# 109-02-088
# 136-18-117
# 109-21-100
# 672-06-054
# 673-12-062
##
@app.route('/parcel/<string:parcelid>/data')
def get_parcel(parcelid):
    parcel_url = "http://neocando.case.edu/cando/housingReport/lbxml.jsp?parcel="+parcelid
    xmldata =   urllib.request.urlopen(parcel_url).read()  
    #strip the string to remove spaces aroung the xml string
    return json.dumps(xmltodict.parse(xmldata.strip()))    


@app.route('/parcel/<string:parcelid>')
def display_page(parcelid):
    data =json.loads(get_parcel(parcelid))
    return render_template('parcel.html', data=data)   


if __name__ == "__main__" :
    #app.run(debug=True)
    app.run(threaded=True, port=5000)