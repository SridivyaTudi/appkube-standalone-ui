const board = {
    board: {
        "uri": "db/istio-control-plane-dashboard",
        "title": "Istio Control Plane Dashboard",
        "slug": "istio-control-plane-dashboard",
        "uid": "3--MLVZZk",
        "org_id": 1,
        "panels": [
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 5,
                    "w": 24,
                    "x": 0,
                    "y": 1
                },
                "id": 56,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Pilot Versions",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "A",
                        "expr": "sum(istio_build{component=\"pilot\"}) by (tag)",
                        "intervalFactor": 1,
                        "legendFormat": "{{ tag }}",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": false
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 7,
                    "w": 6,
                    "x": 0,
                    "y": 7
                },
                "id": 5,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Memory",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "I",
                        "expr": "process_virtual_memory_bytes{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Virtual Memory",
                        "format": "time_series"
                    },
                    {
                        "refId": "H",
                        "expr": "process_resident_memory_bytes{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Resident Memory",
                        "format": "time_series"
                    },
                    {
                        "refId": "A",
                        "hide": true,
                        "expr": "go_memstats_heap_sys_bytes{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "legendFormat": "heap sys",
                        "format": "time_series"
                    },
                    {
                        "refId": "D",
                        "hide": true,
                        "expr": "go_memstats_heap_alloc_bytes{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "legendFormat": "heap alloc",
                        "format": "time_series"
                    },
                    {
                        "refId": "F",
                        "expr": "go_memstats_alloc_bytes{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Alloc",
                        "format": "time_series"
                    },
                    {
                        "refId": "E",
                        "expr": "go_memstats_heap_inuse_bytes{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Heap in-use",
                        "format": "time_series"
                    },
                    {
                        "refId": "G",
                        "expr": "go_memstats_stack_inuse_bytes{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Stack in-use",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "container_memory_working_set_bytes{container=~\"discovery\", pod=~\"istiod-.*|istio-pilot-.*\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Discovery (container)",
                        "format": "time_series"
                    },
                    {
                        "refId": "C",
                        "expr": "container_memory_working_set_bytes{container=~\"istio-proxy\", pod=~\"istiod-.*|istio-pilot-.*\"}",
                        "intervalFactor": 1,
                        "legendFormat": "Sidecar (container)",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "bytes",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": false
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 7,
                    "w": 6,
                    "x": 6,
                    "y": 7
                },
                "id": 6,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "CPU",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "A",
                        "expr": "sum(irate(container_cpu_usage_seconds_total{container=\"discovery\", pod=~\"istiod-.*|istio-pilot-.*\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Discovery (container)",
                        "format": "time_series"
                    },
                    {
                        "refId": "C",
                        "expr": "irate(process_cpu_seconds_total{app=\"istiod\"}[1m])",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Discovery (process)",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "sum(irate(container_cpu_usage_seconds_total{container=\"istio-proxy\", pod=~\"istiod-.*|istio-pilot-.*\"}[1m]))",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Sidecar (container)",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 7,
                    "w": 6,
                    "x": 12,
                    "y": 7
                },
                "id": 7,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Disk",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "B",
                        "expr": "container_fs_usage_bytes{container=\"discovery\", pod=~\"istiod-.*|istio-pilot-.*\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Discovery",
                        "format": "time_series"
                    },
                    {
                        "refId": "A",
                        "expr": "container_fs_usage_bytes{container=\"istio-proxy\", pod=~\"istiod-.*|istio-pilot-.*\"}",
                        "intervalFactor": 1,
                        "legendFormat": "Sidecar",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "bytes",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "none",
                        "logBase": 1024,
                        "show": false
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 7,
                    "w": 6,
                    "x": 18,
                    "y": 7
                },
                "id": 4,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Goroutines",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": false,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "A",
                        "expr": "go_goroutines{app=\"istiod\"}",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "Number of Goroutines",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 8,
                    "x": 0,
                    "y": 15
                },
                "id": 622,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Pilot Pushes",
                "description": "Shows the rate of pilot pushes",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": true,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": false,
                "linewidth": 1,
                "nullPointMode": "null as zero",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": true,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "C",
                        "expr": "sum(irate(pilot_xds_pushes{type=\"cds\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Cluster",
                        "format": "time_series"
                    },
                    {
                        "refId": "D",
                        "expr": "sum(irate(pilot_xds_pushes{type=\"eds\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Endpoints",
                        "format": "time_series"
                    },
                    {
                        "refId": "A",
                        "expr": "sum(irate(pilot_xds_pushes{type=\"lds\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Listeners",
                        "format": "time_series"
                    },
                    {
                        "refId": "E",
                        "expr": "sum(irate(pilot_xds_pushes{type=\"rds\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Routes",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "sum(irate(pilot_xds_pushes{type=\"sds\"}[1m]))",
                        "legendFormat": "Secrets"
                    },
                    {
                        "refId": "F",
                        "expr": "sum(irate(pilot_xds_pushes{type=\"nds\"}[1m]))",
                        "legendFormat": "Nametables"
                    }
                ],
                "tooltip": {
                    "shared": false,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "ops",
                        "logBase": 1,
                        "min": 0,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": false
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 8,
                    "x": 8,
                    "y": 15
                },
                "id": 67,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Pilot Errors",
                "description": "Captures a variety of pilot errors",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": true,
                    "hideZero": true,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "C",
                        "expr": "sum(pilot_xds_cds_reject{app=\"istiod\"}) or (absent(pilot_xds_cds_reject{app=\"istiod\"}) - 1)",
                        "intervalFactor": 1,
                        "legendFormat": "Rejected CDS Configs",
                        "format": "time_series"
                    },
                    {
                        "refId": "D",
                        "expr": "sum(pilot_xds_eds_reject{app=\"istiod\"}) or (absent(pilot_xds_eds_reject{app=\"istiod\"}) - 1)",
                        "intervalFactor": 1,
                        "legendFormat": "Rejected EDS Configs",
                        "format": "time_series"
                    },
                    {
                        "refId": "A",
                        "expr": "sum(pilot_xds_rds_reject{app=\"istiod\"}) or (absent(pilot_xds_rds_reject{app=\"istiod\"}) - 1)",
                        "intervalFactor": 1,
                        "legendFormat": "Rejected RDS Configs",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "sum(pilot_xds_lds_reject{app=\"istiod\"}) or (absent(pilot_xds_lds_reject{app=\"istiod\"}) - 1)",
                        "intervalFactor": 1,
                        "legendFormat": "Rejected LDS Configs",
                        "format": "time_series"
                    },
                    {
                        "refId": "F",
                        "expr": "sum(rate(pilot_xds_write_timeout{app=\"istiod\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Write Timeouts",
                        "format": "time_series"
                    },
                    {
                        "refId": "H",
                        "expr": "sum(rate(pilot_total_xds_internal_errors{app=\"istiod\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Internal Errors",
                        "format": "time_series"
                    },
                    {
                        "refId": "E",
                        "expr": "sum(rate(pilot_total_xds_rejects{app=\"istiod\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Config Rejection Rate",
                        "format": "time_series"
                    },
                    {
                        "refId": "K",
                        "expr": "sum(rate(pilot_xds_push_context_errors{app=\"istiod\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Push Context Errors",
                        "format": "time_series"
                    },
                    {
                        "refId": "G",
                        "expr": "sum(rate(pilot_xds_write_timeout{app=\"istiod\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Push Timeouts",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 8,
                    "x": 16,
                    "y": 15
                },
                "id": 624,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Proxy Push Time",
                "description": "Shows the total time it takes to push a config update to a proxy",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 2,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "A",
                        "expr": "histogram_quantile(0.5, sum(rate(pilot_proxy_convergence_time_bucket[1m])) by (le))",
                        "intervalFactor": 1,
                        "legendFormat": "p50 ",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "histogram_quantile(0.9, sum(rate(pilot_proxy_convergence_time_bucket[1m])) by (le))",
                        "intervalFactor": 1,
                        "legendFormat": "p90",
                        "format": "time_series"
                    },
                    {
                        "refId": "C",
                        "expr": "histogram_quantile(0.99, sum(rate(pilot_proxy_convergence_time_bucket[1m])) by (le))",
                        "intervalFactor": 1,
                        "legendFormat": "p99",
                        "format": "time_series"
                    },
                    {
                        "refId": "D",
                        "expr": "histogram_quantile(0.999, sum(rate(pilot_proxy_convergence_time_bucket[1m])) by (le))",
                        "intervalFactor": 1,
                        "legendFormat": "p99.9",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "s",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 12,
                    "x": 0,
                    "y": 23
                },
                "id": 45,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Conflicts",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": true,
                    "hideZero": true,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null as zero",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "B",
                        "expr": "pilot_conflict_inbound_listener{app=\"istiod\"}",
                        "intervalFactor": 1,
                        "legendFormat": "Inbound Listeners",
                        "format": "time_series"
                    },
                    {
                        "refId": "A",
                        "expr": "pilot_conflict_outbound_listener_http_over_current_tcp{app=\"istiod\"}",
                        "intervalFactor": 1,
                        "legendFormat": "Outbound Listeners (http over current tcp)",
                        "format": "time_series"
                    },
                    {
                        "refId": "C",
                        "expr": "pilot_conflict_outbound_listener_tcp_over_current_tcp{app=\"istiod\"}",
                        "intervalFactor": 1,
                        "legendFormat": "Outbound Listeners (tcp over current tcp)",
                        "format": "time_series"
                    },
                    {
                        "refId": "D",
                        "expr": "pilot_conflict_outbound_listener_tcp_over_current_http{app=\"istiod\"}",
                        "intervalFactor": 1,
                        "legendFormat": "Outbound Listeners (tcp over current http)",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": false
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 12,
                    "x": 12,
                    "y": 23
                },
                "id": 47,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "ADS Monitoring",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "A",
                        "expr": "avg(pilot_virt_services{app=\"istiod\"})",
                        "intervalFactor": 1,
                        "legendFormat": "Virtual Services",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "avg(pilot_services{app=\"istiod\"})",
                        "intervalFactor": 1,
                        "legendFormat": "Services",
                        "format": "time_series"
                    },
                    {
                        "refId": "E",
                        "expr": "sum(pilot_xds{app=\"istiod\"}) by (pod)",
                        "intervalFactor": 1,
                        "legendFormat": "Connected Endpoints {{pod}}",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 8,
                    "x": 0,
                    "y": 32
                },
                "id": 40,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Envoy Details",
                "description": "Shows details about Envoy proxies in the mesh",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "C",
                        "expr": "sum(irate(envoy_cluster_upstream_cx_total{cluster_name=\"xds-grpc\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "XDS Connections",
                        "format": "time_series"
                    },
                    {
                        "refId": "A",
                        "expr": "sum(irate(envoy_cluster_upstream_cx_connect_fail{cluster_name=\"xds-grpc\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "XDS Connection Failures",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "sum(increase(envoy_server_hot_restart_epoch[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "Envoy Restarts",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "ops",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "ops",
                        "logBase": 1,
                        "show": false
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 8,
                    "x": 8,
                    "y": 32
                },
                "id": 41,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "XDS Active Connections",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "C",
                        "expr": "sum(envoy_cluster_upstream_cx_active{cluster_name=\"xds-grpc\"})",
                        "intervalFactor": 2,
                        "step": 2,
                        "legendFormat": "XDS Active Connections",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            },
            {
                "datasource": "Prometheus",
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 8,
                    "x": 16,
                    "y": 32
                },
                "id": 42,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "XDS Requests Size",
                "description": "Shows the size of XDS requests and responses",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "D",
                        "expr": "max(rate(envoy_cluster_upstream_cx_rx_bytes_total{cluster_name=\"xds-grpc\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "XDS Response Bytes Max",
                        "format": "time_series"
                    },
                    {
                        "refId": "B",
                        "expr": "quantile(0.5, rate(envoy_cluster_upstream_cx_rx_bytes_total{cluster_name=\"xds-grpc\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "XDS Response Bytes Average",
                        "format": "time_series"
                    },
                    {
                        "refId": "A",
                        "expr": "max(rate(envoy_cluster_upstream_cx_tx_bytes_total{cluster_name=\"xds-grpc\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "XDS Request Bytes Max",
                        "format": "time_series"
                    },
                    {
                        "refId": "C",
                        "expr": "quantile(.5, rate(envoy_cluster_upstream_cx_tx_bytes_total{cluster_name=\"xds-grpc\"}[1m]))",
                        "intervalFactor": 1,
                        "legendFormat": "XDS Request Bytes Average",
                        "format": "time_series"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "Bps",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "ops",
                        "logBase": 1,
                        "show": false
                    }
                ]
            },
            {
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 12,
                    "x": 0,
                    "y": 41
                },
                "id": 629,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Configuration Validation",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 2,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "A",
                        "expr": "sum(rate(galley_validation_passed[1m]))",
                        "legendFormat": "Validations (Success)"
                    },
                    {
                        "refId": "B",
                        "expr": "sum(rate(galley_validation_failed[1m]))",
                        "legendFormat": "Validation (Failure)"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            },
            {
                "editable": false,
                "error": false,
                "gridPos": {
                    "h": 8,
                    "w": 12,
                    "x": 12,
                    "y": 41
                },
                "id": 630,
                "isNew": false,
                "renderer": "flot",
                "span": 0,
                "title": "Sidecar Injection",
                "description": "",
                "transparent": false,
                "type": "graph",
                "aliasColors": {},
                "bars": false,
                "dashLength": 10,
                "dashes": false,
                "fill": 1,
                "legend": {
                    "alignAsTable": false,
                    "avg": false,
                    "current": false,
                    "hideEmpty": false,
                    "hideZero": false,
                    "max": false,
                    "min": false,
                    "rightSide": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 1,
                "nullPointMode": "null",
                "percentage": false,
                "pointradius": 2,
                "points": false,
                "spaceLength": 10,
                "stack": false,
                "steppedLine": false,
                "targets": [
                    {
                        "refId": "A",
                        "expr": "sum(rate(sidecar_injection_success_total[1m]))",
                        "legendFormat": "Injections (Success)"
                    },
                    {
                        "refId": "B",
                        "expr": "sum(rate(sidecar_injection_failure_total[1m]))",
                        "legendFormat": "Injections (Failure)"
                    }
                ],
                "tooltip": {
                    "shared": true,
                    "value_type": "individual"
                },
                "xaxis": {
                    "format": "",
                    "logBase": 0,
                    "show": true
                },
                "yaxes": [
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    },
                    {
                        "format": "short",
                        "logBase": 1,
                        "show": true
                    }
                ]
            }
        ],
        "template_vars": [
            {
                "name": "datasource",
                "query": "prometheus",
                "datasource": {
                    "id": 1,
                    "name": "Prometheus"
                },
                "value": [
                    "default"
                ]
            }
        ]
    },
    panels: [{
        "datasource": "Prometheus",
        "editable": false,
        "error": false,
        "gridPos": {
            "h": 5,
            "w": 24,
            "x": 0,
            "y": 1
        },
        "id": 56,
        "isNew": false,
        "renderer": "flot",
        "span": 0,
        "title": "Pilot Versions",
        "transparent": false,
        "type": "graph",
        "aliasColors": {},
        "bars": false,
        "dashLength": 10,
        "dashes": false,
        "fill": 1,
        "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": false,
            "hideEmpty": false,
            "hideZero": false,
            "max": false,
            "min": false,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": false
        },
        "lines": true,
        "linewidth": 1,
        "nullPointMode": "null",
        "percentage": false,
        "pointradius": 5,
        "points": false,
        "spaceLength": 10,
        "stack": false,
        "steppedLine": false,
        "targets": [
            {
                "refId": "A",
                "expr": "sum(istio_build{component=\"pilot\"}) by (tag)",
                "intervalFactor": 1,
                "legendFormat": "{{ tag }}",
                "format": "time_series"
            }
        ],
        "tooltip": {
            "shared": true,
            "value_type": "individual"
        },
        "xaxis": {
            "format": "",
            "logBase": 0,
            "show": true
        },
        "yaxes": [
            {
                "format": "short",
                "logBase": 1,
                "show": true
            },
            {
                "format": "short",
                "logBase": 1,
                "show": false
            }
        ]
    }],
    templateVars: ['']
};
const newStartDate = new Date();
newStartDate.setMinutes(newStartDate.getMinutes() - 5);
export const props = {
    board,
    endDate: new Date(),
    from: "now-5m",
    grafanaAPIKey: "",
    grafanaURL: "http://grafana.synectiks.net:80",
    inDialog: false,
    liveTail: true,
    panel: {
        "datasource": "Prometheus",
        "editable": false,
        "error": false,
        "gridPos": {
            "h": 5,
            "w": 24,
            "x": 0,
            "y": 1
        },
        "id": 56,
        "isNew": false,
        "renderer": "flot",
        "span": 0,
        "title": "Pilot Versions",
        "transparent": false,
        "type": "graph",
        "aliasColors": {},
        "bars": false,
        "dashLength": 10,
        "dashes": false,
        "fill": 1,
        "legend": {
            "alignAsTable": false,
            "avg": false,
            "current": false,
            "hideEmpty": false,
            "hideZero": false,
            "max": false,
            "min": false,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": false
        },
        "lines": true,
        "linewidth": 1,
        "nullPointMode": "null",
        "percentage": false,
        "pointradius": 5,
        "points": false,
        "spaceLength": 10,
        "stack": false,
        "steppedLine": false,
        "targets": [
            {
                "refId": "A",
                "expr": "sum(istio_build{component=\"pilot\"}) by (tag)",
                "intervalFactor": 1,
                "legendFormat": "{{ tag }}",
                "format": "time_series"
            }
        ],
        "tooltip": {
            "shared": true,
            "value_type": "individual"
        },
        "xaxis": {
            "format": "",
            "logBase": 0,
            "show": true
        },
        "yaxes": [
            {
                "format": "short",
                "logBase": 1,
                "show": true
            },
            {
                "format": "short",
                "logBase": 1,
                "show": false
            }
        ]
    },
    panelData: {},
    prometheusURL: undefined,
    refresh: '10s',
    sparkline: false,
    startDate: newStartDate,
    templateVars: [''],
    testUUID: "",
    to: "now",
};
