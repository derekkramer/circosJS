var circos = new Circos({
  container: '#chart',
  width: 1000,
  height: 1000
})

var gieStainColor = {
  gpos100: 'rgb(0,0,0)',
  gpos: 'rgb(0,0,0)',
  gpos75: 'rgb(130,130,130)',
  gpos66: 'rgb(160,160,160)',
  gpos50: 'rgb(200,200,200)',
  gpos33: 'rgb(210,210,210)',
  gpos25: 'rgb(200,200,200)',
  gvar: 'rgb(220,220,220)',
  gneg: 'rgb(255,255,255)',
  acen: 'rgb(217,47,39)',
  stalk: 'rgb(100,127,164)',
  select: 'rgb(135,177,255)'
}

var drawCircos = function (error, GRCh37, cytobands) {
  cytobands = cytobands.map(function (d) {
    return {
      block_id: d.chrom,
      start: parseInt(d.chromStart),
      end: parseInt(d.chromEnd),
      gieStain: d.gieStain,
      name: d.name
    }
  })

  circos
    .layout(
      [GRCh37[0]],
    {
      innerRadius: 300,
      outerRadius: 320,
      labels: {display: false},
      ticks: {display: false}
    }
    )
    .highlight('cytobands', cytobands, {
      innerRadius: 300,
      outerRadius: 320,
      opacity: 0.7,
      color: function (d) {
        return gieStainColor[d.gieStain]
      },
      tooltipContent: function (d) {
        return d.name
      }
    })
    .text('cytobands-labels', cytobands.map(function (d) {
      d.position = (d.start + d.end) / 2
      d.value = d.name
      return d
    }), {
      innerRadius: 330,
      outerRadius: 400,
      style: {
        'font-size': 12
      },
      color: function (d) {
        return gieStainColor[d.gieStain]
      }
    })
    .render()
}

d3.queue()
  .defer(d3.json, '../data/GRCh37.json')
  .defer(d3.csv, '../data/cytobands.csv')
  .await(drawCircos)
