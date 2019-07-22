{
  "targets": [{
    "target_name": "epoll",
    "conditions": [[
      'OS == "linux"', {
        "include_dirs" : [
          "<!(node -e \"require('nan')\")"
        ],
        "sources": [
          "./src/epoll.cc"
        ],
        "conditions": [[
          '"<!(echo $V)" != "1"', {
            "cflags": [
              "-Wno-deprecated-declarations",
              "-Wno-cast-function-type"
            ]
          }]
        ]
      }]
    ]
  }]
}

