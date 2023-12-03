import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';
import axios from "axios";
import './DataGraph.css';

const DataGraph = ({ currentItem, closePopup }) => {
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/similar_nodes/${currentItem.title}`, {
          headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        });
        const relatedItems = response.data;

        const nodes = [];
        const edges = [];
        let nodeId = 1;
        console.log({relatedItems:relatedItems})
        const createNodesAndEdges = (parent, items) => {
          for (const item of items) {
            const node = { id: nodeId, label: item.id, title: item.title,authors:item.authors,doi:item.doi };
            nodes.push(node);
            edges.push({ from: parent, to: nodeId });
            nodeId++;

            if (item.similar_recommendations && item.similar_recommendations.length > 0) {
              createNodesAndEdges(node.id, item.similar_recommendations);
            }
          }
        };

        nodes.push({ id: nodeId, label: currentItem.id, title: currentItem.title,shape:"circle"});
        nodeId++;

        createNodesAndEdges(1, relatedItems.nodes);
        setGraph({ nodes, edges });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentItem]);

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    // height: "500px",
    // configure: {},    // defined in the configure module.
    //     edges: {width: function (edge) {
    //       // Set edge width based on similarity
    //       return edge.similarity * 5; // Multiply by a factor to adjust the width
    //     },
    // },        // defined in the edges module.
    // nodes: {},        // defined in the nodes module.
    // groups: {},       // defined in the groups module.
    layout: {},       // defined in the layout module.
    interaction: {},  // defined in the interaction module.
    manipulation: {}, // defined in the manipulation module.
    physics: {},      // defined in the physics module.
    clickToUse: true
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log(nodes, edges);
    },
    // selectNode: function(event) {
    //   console.log(event.nodes);
    // },
    selectNode: function (event) {
      const { nodes } = event;
      const tooltip = document.getElementById("tooltip");

      if (nodes.length > 0) {
        const nodeId = nodes[0];
        const node = graph.nodes.find((n) => n.id === nodeId);

        if (node && node.title) {
          console.log({node:node});
          tooltip.innerText = node.title;
          var doiUrl = `https://www.doi.org/${node.doi}`
          tooltip.innerHTML = `<p><strong>Title: </strong>${node.title}</p>

          <p><strong>Authors: </strong>${node.authors}</p>
          <strong>DOI: </strong>
          <a href=${doiUrl} target="_blank">
            ${node.doi}
          </a>`;
          // tooltip.style.top = `${event.event.clientY}px`;
          // tooltip.style.left = `${event.event.clientX}px`;
        }
      } else {
        tooltip.style.display = "none";
      }
    },
    blurNode: function () {
      const tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    },

  };



  const handleTooltipClose = () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
    closePopup(); // Call the closePopup function passed as a prop
  };

  const handleNodeSelect = (event) => {
    const { nodes } = event;
    const tooltip = document.getElementById("tooltip");
    const popupContainer = document.querySelector(".popup-container");
  
    if (nodes.length > 0) {
      const nodeId = nodes[0];
      const node = graph.nodes.find((n) => n.id === nodeId);
  
      if (node && node.title) {
        // tooltip.innerText = node.title;
        tooltip.innerHTML = `
        <p><strong>Authors: </strong>${node.authors}</p>`;

        tooltip.style.display = "block";
  
        // Get the positions of the tooltip and popup container
        // const tooltipRect = tooltip.getBoundingClientRect();
        // const popupRect = popupContainer.getBoundingClientRect();
  
        // // Adjust tooltip position to stay within the popup container
        // const top = Math.min(event.event.clientY, popupRect.bottom - tooltipRect.height);
        // const left = Math.min(event.event.clientX, popupRect.right - tooltipRect.width);
  
        // tooltip.style.top = `${top}px`;
        // tooltip.style.left = `${left}px`;
      }
    } else {
      tooltip.style.display = "none";
    }
  };
  

  const handleBlurNode = () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  };

  return (
    <div className="popup-container">
      <div className="popup-body">
        {/* Graph Component */}
        <div className = "graph-container">
        <Graph graph={graph} options={options} events={{
          selectNode: handleNodeSelect,
          blurNode: handleBlurNode,
          ...events
        }} />
        </div>
        <div id="tooltip" className="tooltip-container">
        </div>
      </div>
      {/* Tooltip */}

      <button onClick={handleTooltipClose} className='close-button'>X</button>
    </div>
  );
};

export default DataGraph;
